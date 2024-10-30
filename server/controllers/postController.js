import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import uploadPicture from "./../middlewares/uploadPicture.js";
import fileRemover from "./../utils/fileRemover";

const createPost = async (req, res, next) => {
  try {
    const { title, caption, category, image, desc } = req.body;
    if (!title && !caption && !category && !image && !desc) {
      return console.log("You must enter all fields!");
    }
    const newData = new Post({
      title,
      caption,
      category,
      image,
      desc,
    });
    const savedData = newData.save();
    return res.status(200).json({
      message: "Post created successfully!",
      newData,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post was not found!");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdateData = async (data) => {
      const { title, caption, slug, body, tags, category } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.category = category || post.category;

      const updatePost = await post.save();
      return res.json(updatePost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
      } else {
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdateData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdateData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      const error = new Error("Post was not found!");
      next(error);
      return;
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "category",
        select: ["title"],
      },
      {
        path: "comment",
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            populate: [
              {
                path: "user",
                select: ["name", "avatar"],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error("Post was not found!");
      return next(error);
    }

    return res.json({ post });
  } catch (error) {
    next(error);
  }
};
