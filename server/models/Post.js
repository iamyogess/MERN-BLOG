import mongoose, { model, Schema } from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: mongoose.Schema.Types.Mixed, required: true },
    photo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    category: { type: Schema.Types.ObjectId, ref: "PostCategory" },
  },
  { timestamps: true }
);

postSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", postSchema);

export default Post;
