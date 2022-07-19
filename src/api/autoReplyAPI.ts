import Axios from "axios";
import { backEndLink } from "../globalValues";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../helperFns/popUpAlert";
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
      openNotification(
        "Success send ",
        NotificationColor.Success,
        NotificationTitle.Success
      );
      return response.status;
    })
    .catch(() => {
      openNotification(
        "Success Error ",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      return null;
    });
};
