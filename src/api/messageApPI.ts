import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Message, MessageReturnBody } from "../types/MessageType";

const basicURL = backEndLink;

export const messageAdd = async (message: Message): Promise<number | null> => {
  const endpoint = basicURL + "messageInsert";
  return Axios.post(endpoint, {
    messageBody: message,
  })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const messagesGet = async (
  parentId: string,
  page: number,
  pageNum: number,
  userEmail: string,
  type: string
): Promise<MessageReturnBody | null> => {
  const endpoint =
    basicURL +
    `messagesGet?parentId=${parentId}&page=${page}&pageNum=${pageNum}&userEmail=${userEmail}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const messagesUpdate = async (
  messages: Message[]
): Promise<MessageReturnBody | null> => {
  const endpoint = basicURL + `messagesUpdate`;
  return Axios.put(endpoint, {
    messages: messages,
  })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const messageDelete = async (
  messageId: string
): Promise<string | null> => {
  const endpoint = basicURL + `messageDelete?messageId=${messageId}`;
  return Axios.delete(endpoint)
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};
