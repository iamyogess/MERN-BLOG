import mongoose, { model } from "mongoose";

const postCategorySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const PostCategory = model(PostCategory, postCategorySchema);

export default PostCategory;
