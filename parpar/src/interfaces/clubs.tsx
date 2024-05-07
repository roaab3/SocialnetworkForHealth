import {IPosts} from "./posts";
import { IUser } from "./users";
export interface IClubs {
  _id: string;
  name: string;
  description: string;
  imageUrl: string | File | undefined;
  followers: number;
  type: string;
  domain: Array<string>;
  moderators: Array<string>;
  posts: Array<IPosts>;
  author: string;
  publicationDate: Date;
}

export interface FormData {
  name: string;
  description: string;
  imageUrl: string | File | undefined;
  author: string;
  type: string;
  domain: Array<string>;
}
