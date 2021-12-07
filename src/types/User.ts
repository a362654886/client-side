export type User = {
  _id: string;
  userEmail: string;
  password: string;
  name: string;
  gender: Gender;
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
};

export type UserRate = {
  animeId: string;
  rate: number;
};

export enum Gender {
  male = "male",
  female = "female",
}

export type Avatar = {
  _id: string;
  imageName: string;
  imageUrl: string;
};
