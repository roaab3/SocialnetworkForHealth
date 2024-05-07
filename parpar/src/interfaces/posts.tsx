import { IComments } from "./comments";

export interface IPostResult {
    posts: IPosts[];
    count: number;
  }

  enum PostType {
    Advice = "Advice",
    Question = "Question",
    Article = "Article",
    Other = "Other"
  }  
  
  export interface IPosts {
    _id: string;
    title: string;
    content: string;
    imageUrl: string | File | undefined;
    domain: Array<string>;
    club: string;
    type: PostType;
    tags: Array<string>;
    publicationDate: Date;
    author: string | null;
    likes: number;
    comments: Array<IComments>
  }
  export interface FormData {
    title: string;
    content: string;
    imageUrl: string | File | undefined;
    domain: Array<string>;
    club: string;
    type: PostType;
    tags: Array<string>;
    author: string;
  }
  
  