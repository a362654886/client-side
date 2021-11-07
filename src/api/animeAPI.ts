import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Anime } from "../types/Amine";

const basicURL = backEndLink;

export const animeAdd = async (anime: Anime): Promise<number | null> => {
  const endpoint = basicURL + "animeInsert";
  return Axios.post(endpoint, { animeBody: anime })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const animeAllGet = async (
  value: string,
  page: number,
  pageSize: number
): Promise<{
  result: Anime[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `animeAllGet?searchValue=${value}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const animeUpdate = async (anime: Anime): Promise<number | null> => {
  const endpoint = basicURL + "animeUpdate";
  return Axios.put(endpoint, { animeBody: anime })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
