import Axios from "axios";
import { backEndLink } from "../globalValues";
import { MarketType } from "../types/MarketType";
import { Video } from "../types/VideoType";

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

export const marketAllGet = async (
  value: string,
  page: number,
  pageSize: number
): Promise<{
  markets: MarketType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `marketsGet?searchValue=${value}&page=${page}&pageSize=${pageSize}`;
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
