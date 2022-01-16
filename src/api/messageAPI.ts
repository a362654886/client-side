import Axios from "axios";
import { backEndLink } from "../globalValues";
import { MessageType } from "../types/MessageType";

const basicURL = backEndLink;

export const messageAdd = async (
  messageBody: MessageType
): Promise<number | null> => {
  const endpoint = basicURL + "messageInsert";
  return Axios.post(endpoint, { messageBody: messageBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const messagesAllGetByUserId = async (
  userId: string,
  page: number,
  pageSize: number
): Promise<{
  result: MessageType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `messagesGetByUserId?userId=${userId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const messagesAllGetByReceivedId = async (
  receiveId: string,
  page: number,
  pageSize: number
): Promise<{
  result: MessageType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `messagesGetByReceiveId?receiveId=${receiveId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const messageDelete = async (
  messageId: string
): Promise<number | null> => {
  const endpoint = basicURL + `messageDelete?messageId=${messageId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
