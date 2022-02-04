export type MessageType = {
  _id: string;
  userId: string;
  receiveId: string;
  uploadTime: Date;
  message: string;
  userAvatar?: string;
  userName?: string;
  userCountry?: string;
  receiveAvatar?: string;
  receiveName?: string;
  receiveCountry?: string;
};
