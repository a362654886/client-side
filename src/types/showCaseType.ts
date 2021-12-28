import { TagType } from "./tagType";

export type ShowCaseType = {
  _id: string;
  showCaseId: string;
  imageArr: string[];
  type: ShowCaseEnum;
  userAvatar: string;
  userName: string;
  userId: string;
  tags: TagType[];
  text: string;
  source: string;
  edit?: boolean;
  showReplay?: boolean;
  replies?: ShowCaseReply[];
  title?: string;
  description?: string;
  aweSome: number;
};

export type ShowCaseReply = {
  _id: string;
  replyId: string;
  showCaseId: string;
  text: string;
  uploadTime: Date;
  userId: string;
  userAvatar: string;
  userName: string;
  edit?: boolean;
  showReplay?: boolean;
  secondReplies?: ShowSecondCaseReply[];
};

export type ShowSecondCaseReply = {
  _id: string;
  replyId: string;
  showCaseId: string;
  text: string;
  uploadTime: Date;
  userAvatar: string;
  userId: string;
  userName: string;
  edit?: boolean;
};

export enum ShowCaseEnum {
  Collections = "collections",
  Illustrations = "Illustrations",
  Manga = "Manga",
}
