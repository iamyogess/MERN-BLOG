import uploadPicture from "../middlewares/uploadPicture.js";
import ActivityLog from "../models/ActivityLog.js";
import User from "../models/User.js";
import fileRemover from "../utils/fileRemover.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = await user.generateJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with user data
    return res.status(201).json({
      _id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    
    // Log attempt regardless of whether user exists
    const logActivity = async (userId, action, description) => {
      await ActivityLog.create({
        userId: userId || null,
        action,
        description
      });
    };

    if (!user) {
      await logActivity(
        null,
        'login_failed',
        `Failed login attempt for email: ${email} - User not found`
      );
      return res.status(404).json({ message: "User does not exist!" });
    }

    // Check if account is locked
    if (user.isLocked()) {
      const timeLeft = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      await logActivity(
        user._id,
        'login_blocked',
        `Login blocked - Account locked for ${timeLeft} more minutes`
      );
      return res.status(403).json({
        message: `Account is locked. Please try again after ${timeLeft} minutes.`
      });
    }

    // Check password
    const comparePassword = await user.comparePassword(password);
    
    if (!comparePassword) {
      // Increment login attempts
      user.loginAttempts += 1;
      
      // Lock account if attempts exceed 4
      if (user.loginAttempts >= 4) {
        user.lockUntil = Date.now() + (15 * 60 * 1000); // Lock for 15 minutes
        await user.save();
        
        await logActivity(
          user._id,
          'account_locked',
          `Account locked for 15 minutes due to 4 failed login attempts`
        );
        
        return res.status(403).json({
          message: "Account locked for 15 minutes due to too many failed attempts."
        });
      }
      
      await user.save();
      await logActivity(
        user._id,
        'login_failed',
        `Failed login attempt (${user.loginAttempts}/4 attempts)`
      );
      
      throw new Error("Invalid email or password!");
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Log successful login
    await logActivity(
      user._id,
      'login_success',
      'User logged in successfully'
    );

    const token = await user.generateJWT();
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      _id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token,
    });
    
  } catch (error) {
    next(error);
  }
};

const getActivityLog = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(logs);
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    const token = await user.generateJWT();
    if (user) {
      return res.status(201).json({
        _id: user.id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token,
      });
    } else {
      let error = new Error("User not found!");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User not found!");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 characters!");
    } else if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUserProfile = await user.save();

    const token = await updatedUserProfile.generateJWT();

    return res.status(201).json({
      _id: updatedUserProfile.id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const uploadProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error ocurred when uploading " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }

          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getBloggerRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.bloggerRequestStatus = true;
    await user.save();
    console.log("Blogger Request sent successfully!");
    return res
      .status(200)
      .json({ message: "Blogger Request sent successfully!" });
  } catch (error) {
    next(error);
  }
};
const bloggerRequest = async (req, res, next) => {
  try {
    const bloggers = await User.find({ bloggerRequestStatus: true });
    console.log("Blogger Request sent successfully!");
    return res.status(200).json({ message: "Blogger Request", bloggers });
  } catch (error) {
    next(error);
  }
};

const approveBloggerRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Ensure you're passing the userId as a parameter
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!user.bloggerRequestStatus) {
      return res.status(400).json({ message: "No pending blogger request!" });
    }

    // Update user properties
    user.blogger = true;
    user.bloggerRequestStatus = false;

    // Save the user changes
    await user.save();

    return res
      .status(200)
      .json({ message: "Blogger request approved successfully!" });
  } catch (error) {
    next(error);
  }
};

const getVerifiedBloggers = async (req, res, next) => {
  try {
    // Fetch users with the "blogger: true" condition
    const bloggers = await User.find({ blogger: true }).select("-password");

    // Return success response
    return res.status(200).json({
      message: "Verified bloggers fetched successfully!",
      bloggers,
    });
  } catch (error) {
    // Pass errors to the next middleware
    next(error);
  }
};

const rejectBloggerRequest = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a parameter
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!user.bloggerRequestStatus) {
      return res
        .status(400)
        .json({ message: "No pending blogger request to reject!" });
    }

    // Update user properties
    user.bloggerRequestStatus = false;

    // Save the user changes
    await user.save();

    return res
      .status(200)
      .json({ message: "Blogger request rejected successfully!" });
  } catch (error) {
    next(error);
  }
};

const revokeBloggerPermission = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (!user.blogger) {
      return res
        .status(400)
        .json({ message: "User is not a blogger, no permissions to revoke!" });
    }

    user.blogger = false;
    await user.save();

    return res.status(200).json({
      message: "Blogger permission revoked successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  approveBloggerRequest,
  getVerifiedBloggers,
  getBloggerRequest,
  rejectBloggerRequest,
  revokeBloggerPermission,
  bloggerRequest,
  getActivityLog
};
