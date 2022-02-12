import { notification } from "antd";

export enum NotificationColor {
  Error = "#FFA69E",
  Success = "#AAFFC9",
  Warning = "#FFDF00",
  Info = "#C1EEFF",
}

export enum NotificationTitle {
  Error = "Error",
  Success = "Success",
  Warning = "Warning",
  Info = "Information",
}

export const openNotification = (
  message: string,
  type: NotificationColor,
  title: NotificationTitle
): void => {
  const width = window.innerWidth;
  const right = (width - 400) / 2;
  notification.open({
    message: title,
    description: message,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    style: { width: `400px`, right: `${right}px`, backgroundColor: type },
  });
  setTimeout(() => {
    localStorage.setItem("alert", "1");
  }, 300);
};

export const popUpAPIResult = async <T>(
  apiFn: T,
  failResult: string
): Promise<void> => {
  try {
    const r = await apiFn;
    if (r && typeof r == "number") {
      openNotification(
        "success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
    } else {
      openNotification(
        failResult,
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
  } catch (error) {
    openNotification(
      "there some error in server side, please connect administer",
      NotificationColor.Warning,
      NotificationTitle.Warning
    );
  }
};
