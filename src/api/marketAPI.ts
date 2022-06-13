import Axios from "axios";
import { backEndLink } from "../globalValues";
import { MarketPriceType, MarketType } from "../types/MarketType";

const basicURL = backEndLink;

export const marketAdd = async (market: MarketType): Promise<number | null> => {
  const endpoint = basicURL + "marketInsert";
  return Axios.post(endpoint, { marketBody: market })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const marketEditAsync = async (
  market: MarketType
): Promise<number | null> => {
  const endpoint = basicURL + "marketEdit";
  return Axios.put(endpoint, { marketBody: market })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const marketAllGet = async (
  value: string,
  page: number,
  pageSize: number,
  city: string,
  country: string,
  priceLow: string,
  priceHeight: string,
  sortType: string,
  tag: string
): Promise<{
  markets: MarketType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `marketsGet?value=${value}&city=${city}&country=${country}&priceLow=${priceLow}&priceHeight=${priceHeight}&sortType=${sortType}&page=${page}&pageSize=${pageSize}&tag=${tag.replace("#","")}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const marketAllGetByArr = async (
  id: string,
  page: number,
  pageSize: number,
  type: number
): Promise<{
  markets: MarketType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `marketsGetByUserArr?id=${id}&page=${page}&pageSize=${pageSize}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const marketGet = async (id: string): Promise<MarketType | null> => {
  const endpoint = basicURL + `marketGet?id=${id}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const marketPriceInsert = async (
  marketPrice: MarketPriceType
): Promise<number | null> => {
  const endpoint = basicURL + `marketPriceInsert`;
  return Axios.post(endpoint, { marketPriceBody: marketPrice })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const marketPricesGetById = async (
  marketId: string,
  page: number,
  pageSize: number
): Promise<{
  marketPrices: MarketPriceType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `marketPricesGet?marketId=${marketId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
