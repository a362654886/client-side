import { BooleanModel } from "aws-sdk/clients/gamelift";

export type User = {
  _id: string;
  sequenceId?: string;
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
  followMarket: string[];
  awesomeNum: number;
  interactionAwesome: boolean;
  interactionComments: boolean;
  interactionBids: boolean;
  interactionNewFollowers: boolean;
  interactionMessages: boolean;
  interactionFirstAnimeNews: boolean;
  shipAddress: string;
  shipCity: string;
  shipSuburb: string;
  showName?:string;
  postCode: string;
  link: string;
  block: boolean;
  blockTime: number;
  blockReason: string;
};

export type UserRate = {
  animeId: string;
  rate: number;
};

export type Avatar = {
  _id: string;
  imageName: string;
  imageUrl: string;
  privateAvatar: boolean;
};
