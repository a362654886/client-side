export type UserLike = {
  _id: string;
  userEmail: string;
  likeMessages: string[];
  likePosts: string[];
  likeVideos: string[];
  likeMerchandises: string[];
};

export type LikeBody = {
  like: boolean;
  Id: string;
};
