import Axios from "axios";
import { backEndLink } from "../globalValues";

const basicURL = backEndLink;

export const emailPost = async (
  toEmail: string,
  text: string,
  subject: string
): Promise<number | null> => {
  /* eslint-disable no-useless-escape */
  const sendString = `{\"to\":\"${toEmail}\",\"subject\":\"${subject}\",\"text\":\"${text}\"}`;
  const endpoint =
    "https://buwf1faqv4.execute-api.us-east-1.amazonaws.com/dev/awsSendEmail";
  return Axios.post(endpoint, { body: sendString })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
