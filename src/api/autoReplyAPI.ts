import Axios from "axios";
import { backEndLink } from "../globalValues";
import { AutoReply } from "../types/autoReplyType";

const basicURL = backEndLink;

export const autoReplyAdd = async (
  autoReply: AutoReply
): Promise<number | null> => {
  const endpoint = basicURL + "autoReplyInsert";
  return Axios.post(endpoint, { autoReply: autoReply })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const testSendEmails = async (): Promise<number | null> => {
  const endpoint = basicURL + "autoReplyEmailsSent";
  return Axios.post(endpoint, {})
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};