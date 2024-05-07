import mongoose, { Document } from "mongoose";
import { postsSchema } from "./posts";

export interface IClub extends Document {
  name: string;
  description: string;
  imageUrl: string;
  author: string;
  type: string;
  domain: Array<String>;
}

// Creating club schema for the database
const clubsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    author: { type: String, required: true },
    type: { type: String, required: true },
    domain: [{ type: String, required: true }],
    posts: [postsSchema], 
    followers: { type: Number, default:0 ,required: false },
  },
  { timestamps: true }
);

const clubs = mongoose.model("clubs", clubsSchema);

export { clubsSchema };
export default clubs;
