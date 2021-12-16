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

const notificationFn = (
  message: string,
  type: NotificationColor,
  title: NotificationTitle
) => {
  const width = window.innerWidth;
  const right = (width - 400) / 2;
  notification.open({
    message: title,
    description: message,
    onClick: () => {
      console.log("Notification Clicked!");
    },
    duration: 20,
    style: { width: `400px`, right: `${right}px`, backgroundColor: type },
  });
};

export { notificationFn };
