import { ImageBody } from "./BasicType";

export type Merchandise = {
  _id: string;
  name: string;
  price: string;
  uploadTime: Date;
  auctionLeftTime: Date;
  userEmail: string;
  state: actionState;
  likeNum: number;
  top: boolean;
  like?: boolean;
  imageBodies?: ImageBody[];
  label: string[];
  auctionEmail: string;
  messages?: number;
};

export enum actionState {
  auctioning = "Auction",
  finish = "finish",
  ready = "ready",
}

export enum MerchandiseQueryType {
  AUCTIONING= "Auctioning",
  ALL="ALL"
}

export type MerchandiseReturnBody = {
  count: number;
  merchandises: Merchandise[];
};
