export type ReportType = {
  _id: string;
  contextId: string;
  type: ReportContextType;
  reportUserId: string;
  forumUserId: string;
  state: string;
  reason: string;
  uploadTime: number;
};

export type ReportShowType = {
  _id: string;
  contextId: string;
  type: string;
  reportUserId: string;
  forumUserId: string;
  state: string;
  reason: string;
  uploadTime: number;
  reportUserAvatar: string;
  reportUserName: string;
  forumUserAvatar: string;
  forumUserName: string;
};

export enum ReportContextType {
  SHOWCASE = "showCase",
  SHOWCASE_REPLY = "showCaseReply",
  SHOWCASE_SECOND_REPLY = "showCaseSecondReply",
  FORUM_ITEM = "forumItem",
  FORUM_SECOND_ITEM = "forumSecondItem",
  PRODUCT = "product",
  VIDEO = "video",
  MARKET = "market",
}
