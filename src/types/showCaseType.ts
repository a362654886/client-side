import { TagType } from "./tagType";

export type ShowCaseType = {
  _id: string;
  showCaseId: string;
  imageArr: string[];
  type: ShowCaseEnum;
  userAvatar: string;
  userName: string;
  tags: TagType[];
  text: string;
  replies?: ShowCaseReply[];
};

export type ShowCaseReply = {
  _id: string;
  replyId: string;
  showCaseId: string;
  text: string;
  uploadTime: Date;
  userAvatar: string;
  userName: string;
};

export enum ShowCaseEnum {
  Collections = "collections",
  Originals = "Originals",
}
