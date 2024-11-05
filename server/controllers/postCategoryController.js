import PostCategory from "../models/PostCategory.js";

const createCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required!" });
    }

    const postCategory = await PostCategory.findOne({ title });
    if (postCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newPostCategory = new PostCategory({ title });
    const savedPostCategory = await newPostCategory.save();
    return res.status(201).json(savedPostCategory);
  } catch (error) {
    next(error);
  }
};


const getPostCategory = async (req, res, next) => {
  try {
    const postCategory = await PostCategory.find({});
    return res.json(postCategory);
  } catch (error) {
    next(error);
  }
};

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const postCategory = await PostCategory.findByIdAndUpdate(
      req.params.postCategoryId,
      {
        title,
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Updated post category: ", postCategory });
  } catch (error) {
    next(error);
  }
};

const deletePostCategory = async (req, res, next) => {
  try {
    await PostCategory.findByIdAndDelete(req.params.postCategoryId);
    res.status(200).json({ message: "Post category deleted!" });
  } catch (error) {
    next(error);
  }
};

export {
  createCategory,
  getPostCategory,
  updatePostCategory,
  deletePostCategory,
};
