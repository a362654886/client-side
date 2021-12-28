export type ForumType = {
  _id: string;
  forumId: string;
  text: string;
  uploadTime: Date;
  userId: string;
  userAvatar: string;
  userName: string;
  anime: string;
  edit?: boolean;
  items?: ForumItem[];
  showReplay?: boolean;
  secondItems?: ForumSecondItem[];
};

export type ForumItem = {
  _id: string;
  forumItemId: string;
  text: string;
  forumId: string;
  uploadTime: Date;
  userId: string;
  userAvatar: string;
  userName: string;
  anime: string;
  edit?: boolean;
  showReplay?: boolean;
  secondItems?: ForumSecondItem[];
};

export type ForumSecondItem = {
  _id: string;
  forumSecondItemId: string;
  forumItemId: string;
  text: string;
  forumId: string;
  uploadTime: Date;
  userId: string;
  userAvatar: string;
  userName: string;
  anime: string;
  edit?: boolean;
};
