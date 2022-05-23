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

export const emailsPost = async (
  toEmails: string[],
  text: string,
  subject: string
): Promise<number | null> => {
  const endpoint = basicURL + "emailsPost";
  return Axios.post(endpoint, {
    toArr: toEmails,
    subject: subject,
    text: text,
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

export const userEmailsGet = async (
  awesome: boolean,
  comments: boolean,
  bids: boolean,
  followers: boolean,
  messages: boolean,
  firstAnimeNews: boolean
): Promise<string[] | null> => {
  const endpoint =
    basicURL +
    `userEmailsGet?awesome=${awesome}&comments=${comments}&bids=${bids}&followers=${followers}&messages=${messages}&firstAnimeNews=${firstAnimeNews}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
