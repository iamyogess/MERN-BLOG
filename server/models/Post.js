import mongoose, { model, mongo, Schema } from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    categories: { type: Schema.Types.ObjectId, ref: "PostCategory" },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
