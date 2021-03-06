import { backEndLink } from "../globalValues";
import { Video } from "../types/VideoType";
import Axios from "axios";

const basicURL = backEndLink;

export const videoAdd = async (video: Video): Promise<number | null> => {
  const endpoint = basicURL + "videoInsert";
  return Axios.post(endpoint, { video: video })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const videosGet = async (userEmail: string): Promise<Video[] | null> => {
  const endpoint = basicURL + `videosGet?userEmail=${userEmail}`;
  return Axios.get(endpoint)
    .then((response) => {
      console.log(response.data)
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
