import Axios from "axios";
import { backEndLink } from "../globalValues";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../helperFns/popUpAlert";

const basicURL = backEndLink;

export const emailPost = async (
  toEmail: string,
  text: string,
  subject: string,
  type?: string
): Promise<number | null> => {
  const endpoint = basicURL + "emailPost";
  return Axios.post(endpoint, {
    to: toEmail,
    subject: subject,
    text: text,
    type: type ? type : "",
  })
    .then((response) => {
      openNotification(
        "email send success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
      return response.status;
    })
    .catch(() => {
      openNotification(
        "email send fail",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      return null;
    });
};
