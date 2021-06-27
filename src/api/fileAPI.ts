import { backEndLink, backEndNodeLink } from "../globalValues";
import { Video } from "../types/VideoType";
import Axios from "axios";

const basicURL = backEndNodeLink;

export const filesAdd = async (chunk: any): Promise<number | null> => {
  const endpoint = basicURL + "video/upload";
  return Axios.post(endpoint, chunk)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const filesUpload = async (name: any): Promise<number | null> => {
    const endpoint = basicURL + `video/all?name=${name}`;
    return Axios.get(endpoint)
      .then((response) => {
        return response.status;
      })
      .catch(() => {
        return null;
      });
  };
