export type AutoReply = {
  _id: string;
  sendUserId: string;
  receiveUserId: string;
  link: string;
  uploadTime: number;
  type: string;
};

export enum AutoReplyEnum {
  Awesome = "Awesome",
  Comments = "Comments",
  Bids = "Bids",
  Follow = "Follow",
  Message = "Message",
}
