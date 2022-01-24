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
  priceHistory?: MarketPriceType[];
  userAvatar?: string;
  userName?: string;
  userCountry?: string;
};

export type MarketPriceType = {
  _id: string;
  userId: string;
  price: number;
};
