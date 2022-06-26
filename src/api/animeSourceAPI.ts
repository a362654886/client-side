import Axios from "axios";
import { backEndLink } from "../globalValues";
import { AnimeSource } from "../types/Amine";

const basicURL = backEndLink;

export const animeSourceAdd = async (
  animeSourceBody: AnimeSource
): Promise<number | null> => {
  const endpoint = basicURL + "animeSourceInsert";
  return Axios.post(endpoint, { animeSourceBody: animeSourceBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const animeSourcesGet = async (): Promise<AnimeSource[]> => {
  const endpoint = basicURL + `animeSourceHandler`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
