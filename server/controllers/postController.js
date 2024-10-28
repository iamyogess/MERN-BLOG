import Post from "../models/Post";

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
