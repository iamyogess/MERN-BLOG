import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function(password) {
          const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
          return passwordRegex.test(password);
        },
        message: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)'
      }
    },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, default: "" },
    admin: { type: Boolean, default: false },
    bloggerRequestStatus: { type: Boolean, default: false },
    blogger: { type: Boolean, default: false },
    // Add new fields for login attempt tracking
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date }
  },
  { timestamps: true }
);

 //method to check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate JWT
userSchema.methods.generateJWT = async function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
