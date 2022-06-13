import Axios from "axios";
import { backEndLink } from "../globalValues";
import { TagType } from "../types/tagType";

const basicURL = backEndLink;

export const tagAllGet = async (): Promise<TagType[]> => {
  const endpoint = basicURL + `tagAllGet`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const marketTagAllGet = async (): Promise<TagType[]> => {
  const endpoint = basicURL + `marketTagAllGet`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

