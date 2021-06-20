export type Message = {
  _id: string;
  messageId: string;
  time: Date;
  userEmail: string;
  parentType: parentType;
  parentId: string;
  context: string;
  likeNum: number;
  like?: boolean;
};

export enum parentType {
  user = "user",
  merchandise = "merchandise",
  post = "post",
}

export type MessageReturnBody = {
  count: number;
  messages: Message[] ;
};
