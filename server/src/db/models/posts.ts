import mongoose from "mongoose";
import { commentSchema } from "./comments";

// Creating posts schema for the database
const postsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: mongoose.Schema.Types.Mixed, required: false }, // Allow any type of data
    domain: [{ type: String, required: true }],
    club: { type: String, required: false },
    type: {
      type: String,
      enum: ["Advice", "Question", "Article", "Other"],
      required: true,
    },
    tags: [{ type: String, required: false }],
    publicationDate: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, required: false },
    comments: [{ type: commentSchema, required: false }],
  },
  { timestamps: true }
);

const posts = mongoose.model("posts", postsSchema);

export { postsSchema };
export default posts;
