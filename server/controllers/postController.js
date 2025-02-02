import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import uploadPicture from "./../middlewares/uploadPicture.js";
import fileRemover from "./../utils/fileRemover.js";
import { v4 as uuid4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("postPicture");
    upload(req, res, async function (err) {
      const { title, caption, body, category, tags } = req.body;

      if (!title || !caption || !body || !category || !tags) {
        return res.status(400).json({ message: "All fields are required!" });
      }
      const user = req.user._id;

      if (err) {
        const error = new Error(
          "An unknown error occurred while uploading photo!" + err.message
        );
        return next(error);
      } else {
        if (!req.file) {
          const error = new Error("You must upload a post picture!");
          next(error);
        }
        let photo = req.file ? req.file.filename : null;

        const savePost = new Post({
          title,
          caption,
          category,
          tags,
          body,
          slug: uuid4(),
          user,
          photo: photo,
        });

        const savedPost = await savePost.save();
        return res
          .status(200)
          .json({ message: "Post uploaded!", data: savedPost });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
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
          "An unknown error occurred when uploading " + err.message
        );
        return next(error);
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

const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyboard;
    let where = {};

    // Apply search filter if present
    if (filter) {
      where.title = { $regex: filter, $options: "i" }; // 'i' for case-insensitive search
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;

    // Count total number of documents matching the filter
    const total = await Post.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    // Set response headers
    res.set({
      "x-filter": filter || "",
      "x-totalCount": total.toString(),
      "x-currentPage": page.toString(),
      "x-pageSize": pageSize.toString(),
      "x-totalPageCount": pages.toString(),
    });

    // If requested page exceeds total pages, return an empty array
    if (page > pages) {
      return res.json([]);
    }

    // Fetch results with pagination and sorting
    const result = await Post.find(where)
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "category",
          select: ["title"],
        },
      ])
      .sort({ updatedAt: -1 });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createPost, getPost, getAllPosts, deletePost, updatePost };
