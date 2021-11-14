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
  tel:string;
  avatar: string;
  likeAnime: string[];
  avatarImage?:Avatar[]
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
