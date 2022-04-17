import Axios from "axios";
import { backEndLink } from "../globalValues";
import { HeadLineType } from "../types/headLine";
import { MarketType } from "../types/MarketType";

const basicURL = backEndLink;

export const headlineAdd = async (
  headline: HeadLineType
): Promise<number | null> => {
  const endpoint = basicURL + "headlineInsert";
  return Axios.post(endpoint, { headlineBody: headline })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const headlineEditAsync = async (
  headline: HeadLineType
): Promise<number | null> => {
  const endpoint = basicURL + "headlineEdit";
  return Axios.put(endpoint, { headlineBody: headline })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const headlineAllGet = async (): Promise<HeadLineType[]> => {
  const endpoint = basicURL + `headlinesGet`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const headlineGet = async (num: number): Promise<MarketType | null> => {
  const endpoint = basicURL + `headlineGet?num=${num}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
