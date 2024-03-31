import {IPosts} from "./posts";
import { IUser } from "./users";
export interface IClubs {
  _id: string;
  name: string;
  description: string;
  imageUrl: any;
  subscribers:  Array<IUser>;
  type: string;
  domain: Array<string>;
  moderators: Array<string>;
  posts: Array<IPosts>;
  author: string;
}

export interface FormData {
  name: string;
  description: string;
  imageUrl: any;
  author: string;
  type: string;
  domain: Array<string>;
}
