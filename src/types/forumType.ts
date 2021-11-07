export type ForumType = {
  _id: string;
  forumId: string;
  text: string;
  uploadTime: Date;
  userAvatar: string;
  userName: string;
  anime: string;
  items?:ForumItem[]
  showReplay?: boolean
};

export type ForumItem = {
  _id: string;
  forumItemId: string;
  text: string;
  forumId: string;
  uploadTime: Date;
  userAvatar: string;
  userName: string;
  anime: string;
};
