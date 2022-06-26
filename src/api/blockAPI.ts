import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ReportShowType, ReportType } from "../types/blockType";
import { MarketType } from "../types/MarketType";
import { Product } from "../types/ProductType";
import { Video } from "../types/VideoType";

const basicURL = backEndLink;

export const blockInsert = async (
  blockBody: ReportType
): Promise<number | null> => {
  const endpoint = basicURL + `blockInsert`;
  return Axios.post(endpoint, { blockBody: blockBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const blockGet = async (
  userId: string,
  page: number,
  type:string
): Promise<{
  result: ReportShowType[];
  count: number;
} | null> => {
  const endpoint = basicURL + `blockGetById?userId=${userId}&page=${page}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const blockGetContext = async (
  userId: string,
  type: string
): Promise<string | Product | Video | MarketType> => {
  const endpoint = basicURL + `blockGetContext?userId=${userId}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const blockUpdate = async (
  blockBody: ReportType
): Promise<number> => {
  const endpoint = basicURL + `blockUpdate`;
  return Axios.put(endpoint,{ blockBody: blockBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return 400;
    });
};
