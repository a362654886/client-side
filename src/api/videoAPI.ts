import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Video } from "../types/VideoType";

const basicURL = backEndLink;

export const videoAdd = async (videoBody: Video): Promise<number | null> => {
  const endpoint = basicURL + "videoInsert";
  return Axios.post(endpoint, { video: videoBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const videosAllGet = async (
  anime: string,
  page: number,
  pageSize: number
): Promise<{
  result: Video[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `videosGet?animeId=${anime}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const videoDelete = async (videoId: string): Promise<number | null> => {
  const endpoint = basicURL + `videoDelete?videoId=${videoId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
