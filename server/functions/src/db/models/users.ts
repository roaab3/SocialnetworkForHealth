import mongoose, { Document } from "mongoose";
import { postsSchema } from "./posts";
import { clubsSchema } from "./clubs";



export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  posts: Array<typeof postsSchema>;
  clubs: Array<typeof clubsSchema>;
  clubsSubscribtion: Array<typeof clubsSchema>;
  points: number;
  type: Array<String>;
  imageUrl: string | File | undefined;
  interests: Array<string>;
  description: string;
  publicationDate: Date; //change
  country: string;
  city: string;
  region: string;
  industry: string;
  position: string;
  friends: Array<string>;
  googleId:string;
}

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: false },
    googleId: { type: String, required: false },
    clubs: [clubsSchema],
    clubsSubscribtion: [clubsSchema],
    description: { type: String, default:" " },
    interests: [{ type: String, required: false }],
    publicationDate: { type: Date,  default: Date.now},
    points: { type: Number, default: 0, required: true  },
    posts: [postsSchema],
    country: { type: String, required: false },
    city: { type: String, required: false },
    region: { type: String, required: false },
    industry: { type: String, required: false },
    position: { type: String, required: false },
    friends: [{ type: String, required: false }],
    followers:[{ type: String, required: false }],
    type: {
      type: String,
      enum: ["Moderator", "regularUser"],

      default:"regularUser"
    },
  },
  { timestamps: true }
);


export default mongoose.model<IUser>("User", usersSchema);
//export { usersSchema };

