export type Anime = {
  _id: string;
  title: string;
  aired: string;
  producers: string;
  rating: string;
  whereToWatch: string[];
  headImage: string;
  likes: number;
  rate: RateBody;
};

export type RateBody = {
  ratePeople: number;
  totalRate: number;
};
