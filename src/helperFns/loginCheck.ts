
import { User } from "../types/User";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "./popUpAlert";

export const IfLoginCheck = (loginUser: User | null): boolean => {
  if (loginUser == null) {
    openNotification(
      "please login",
      NotificationColor.Warning,
      NotificationTitle.Warning
    );
    return false;
  } else {
    return true;
  }
};
