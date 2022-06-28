import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ForumItem, ForumSecondItem, ForumType } from "../types/forumType";
import { imageType } from "../types/imageType";

const basicURL = backEndLink;

//image
export const imageAdd = async (
  imageBody: imageType
): Promise<string | null> => {
  const endpoint = basicURL + "ImageInsert";
  return Axios.post(endpoint, { imageBody: imageBody })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
