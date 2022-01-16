export type User = {
  _id: string;
  userEmail: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  birthday: Date;
  location: string;
  facebook: string;
  ins: string;
  tel: string;
  avatar: string;
  rate: UserRate[];
  likeAnime: string[];
  avatarImage?: Avatar[];
  likeShowcase: string[];
  followManga: string[];
  followUsers: string[];
  awesomeNum: number;
};

export type UserRate = {
  animeId: string;
  rate: number;
};

export type Avatar = {
  _id: string;
  imageName: string;
  imageUrl: string;
};
