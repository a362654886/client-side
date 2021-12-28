import Axios from "axios";
import { backEndLink } from "../globalValues";
import { EpisodeType } from "../types/EpisodeType";

const basicURL = backEndLink;

export const episodeAdd = async (
  episodeBody: EpisodeType
): Promise<number | null> => {
  const endpoint = basicURL + "episodeInsert";
  return Axios.post(endpoint, { episodeBody: episodeBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const episodeGet = async (
  type: string
): Promise<{
  episodes: EpisodeType;
  count: number;
} | null> => {
  const endpoint = basicURL + `episodeGet?type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const episodeGetById = async (
  id: string
): Promise<{
  episodes: EpisodeType;
  count: number;
} | null> => {
  const endpoint = basicURL + `episodeGetById?id=${id}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const episodeUpdate = async (
  episode: EpisodeType
): Promise<number | null> => {
  const endpoint = basicURL + "episodeUpdate";
  return Axios.put(endpoint, {
    episodeBody: episode,
  })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
