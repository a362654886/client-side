import { TagType } from "./tagType";

export type ShowCaseType = {
  _id: string;
  showCaseId: string;
  imageArr: string[];
  type: ShowCaseEnum;
  userAvatar: string;
  userName: string;
  userCountry?: string;
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
  page?: number;
  fullItems?: boolean;
  episode?: number;
  hide: boolean;
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
  userCountry?: string;
  edit?: boolean;
  showReplay?: boolean;
  secondReplies?: ShowSecondCaseReply[];
  page?: number;
  fullItems?: boolean;
  hide: boolean;
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
  userCountry?: string;
  edit?: boolean;
  page?: number;
  fullItems?: boolean;
  reply?: boolean;
  hide: boolean;
};

export enum ShowCaseEnum {
  Collections = "collections",
  Illustrations = "Illustrations",
  Manga = "Manga",
}
