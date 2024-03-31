import { IClubs } from "./clubs";
import { IPosts } from "./posts";

export interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

enum UserType {
  Advice = "Admin",
  Moderator = "Moderator",
  Article = "Doctor",
  Other = "regularUser"
}
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  posts:  Array<IPosts>;
  clubs: Array<IClubs>;
  clubsSubscribtion: Array<IClubs>;
  points: Number;
  type: UserType;
  imageUrl: string;
  subscriptions: string;
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
