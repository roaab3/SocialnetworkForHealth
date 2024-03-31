import mongoose, { Document } from "mongoose";
import { postsSchema } from "./posts";
import { clubsSchema } from "./clubs";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  Newpassword:string;
  posts: Array<typeof postsSchema>;
  clubs: Array<typeof clubsSchema>;
  clubsSubscribtion: Array<typeof clubsSchema>;
  points: Number;
  type: Array<String>;
  imageUrl: string;
  interests: Array<string>;
  description: string;
  publicationDate: string; //change
  country: string;
  city: string;
  region: string;
  industry: string;
  position: string;
  friends: Array<string>;
}

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: false },
    clubs: [clubsSchema],
    clubsSubscribtion: [clubsSchema],
    description: { type: String, required: true },
    interests: [{ type: String, required: false }],
    publicationDate: { type: String, required: true },
    points: { type: Number, required: true },
    posts: [postsSchema],
    country: { type: String, required: false },
    city: { type: String, required: false },
    region: { type: String, required: false },
    industry: { type: String, required: true },
    position: { type: String, required: true },
    friends: [{ type: String, required: false }],
    type: {
      type: String,
      enum: ["Moderator", "regularUser"],
      required: true,
    },
    //authentication: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware to ensure required fields in clubsSubscribtion and clubs
// usersSchema.pre('save', function(next) {
//   const { clubsSubscribtion, clubs } = this;

  // Check if clubsSubscribtion is not empty
//   if (clubsSubscribtion && clubsSubscribtion.length > 0) {
//     clubsSubscribtion.forEach((club) => {
//       // Check if posts exist and not empty
//       if (club.posts && club.posts.length > 0) {
//         club.posts.forEach((post) => {
//           // Validate required fields in posts
//           if (!post.author || !post.publicationDate || !post.type || !post.content) {
//             return next(new Error("All fields in posts are required."));
//           }
//         });
//       }
//     });
//   }

//   // Check if clubs is not empty
//   if (clubs && clubs.length > 0) {
//     clubs.forEach((club) => {
//       // Check if posts exist and not empty
//       if (club.posts && club.posts.length > 0) {
//         club.posts.forEach((post) => {
//           // Validate required fields in posts
//           if (!post.author || !post.publicationDate || !post.type || !post.content) {
//             return next(new Error("All fields in posts are required."));
//           }
//         });
//       }
//     });
//   }

//   // If both clubsSubscribtion and clubs are empty, skip validation
//   if (!clubsSubscribtion.length && !clubs.length) {
//     return next();
//   }

//   next();
// });

export default mongoose.model<IUser>("User", usersSchema);
//export { usersSchema };

//export default users;
