import { TagType } from "./tagType";

export type MarketType = {
  _id: string;
  userId: string;
  imageArr: string[];
  title: string;
  price: number;
  description: string;
  state: string;
  country: string;
  location: string;
  uploadTime: Date;
  priceHistory?: MarketPriceType[];
  userAvatar?: string;
  userName?: string;
  userCountry?: string;
  tags: TagType[] | undefined;
};

export type MarketPriceType = {
  _id: string;
  marketId: string;
  userId: string;
  price: number;
  uploadTime: Date;
  userAvatar?: string;
  userName?: string;
  userCountry?: string;
};
