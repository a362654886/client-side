import { Message } from "./MessageType";

export type Post = {
  _id: string;
  postId: string;
  postTitle: string;
  context: string;
  userEmail: string;
  labelId: string;
  time: Date;
  messages?: number;
  likeNum: number;
  top: boolean;
  like?: boolean;
};

export type Plate = {
  _id: string;
  plateId: string;
  plateName: string;
  imgName: string;
  imgBase64: string;
  showPost?: boolean;
};

export type PostReturnBody = {
  count: number;
  posts: Post[];
};
