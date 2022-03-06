import Axios from "axios";
import { backEndLink } from "../globalValues";

const basicURL = backEndLink;

export const emailPost = async (
  toEmail: string,
  text: string
): Promise<number | null> => {
  const endpoint = basicURL + "emailPost";
  return Axios.post(endpoint, { toEmail: toEmail, text: text })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
