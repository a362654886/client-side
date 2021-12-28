export type MarketType = {
  _id: string;
  userId: string;
  imageArr: string[];
  title: string;
  price: number;
  description: string;
  state: boolean;
  priceHistory?: MarketPriceType[];
  userAvatar?: string;
  userName?: string;
};

export type MarketPriceType = {
  _id: string;
  userId: string;
  price: number;
};
