export type ForumType = {
  _id: string;
  forumId: string;
  text: string;
  uploadTime: Date;
  userId: string;
  userAvatar: string;
  userName: string;
  userCountry?: string;
  anime: string;
  edit?: boolean;
  items?: ForumItem[];
  showReplay?: boolean;
  secondItems?: ForumSecondItem[];
  page?: number;
  fullItems?: boolean;
  hide: boolean;
  animeName?: string;
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
  userCountry?: string;
  anime: string;
  edit?: boolean;
  showReplay?: boolean;
  secondItems?: ForumSecondItem[];
  page?: number;
  fullItems?: boolean;
  hide: boolean;
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
  userCountry?: string;
  anime: string;
  edit?: boolean;
  reply?: boolean;
  hide: boolean;
};
