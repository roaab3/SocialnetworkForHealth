import mongoose from "mongoose";

// Creating posts schema for the database
const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    postID: { type: String, required: true },
  },
  { timestamps: true }
);

const comments = mongoose.model("comments", commentSchema);

export { commentSchema }; // Export the commentSchema as a named export
export default comments;
