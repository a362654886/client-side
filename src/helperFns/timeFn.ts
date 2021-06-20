import moment from "moment";

export const getDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  return `${month}/${date.getDate()}/${date.getFullYear()}`;
};

export const getTimeDifference = (time: Date): string => {
  const nowTime = new Date();
  const oldTime = new Date(time);
  const subtraction = (nowTime.getTime() - oldTime.getTime()) / 1000;
  const days = parseInt((subtraction / (24 * 60 * 60)).toString());
  const afterDays = subtraction - days * 24 * 60 * 60;
  const hours = parseInt((afterDays / (60 * 60)).toString());
  return days == 0 ? `${hours} hours` : `${days} days ${hours} hours`;
};

export const getAuctionTimeDifference = (time: Date): string => {
  const nowTime = new Date();
  const oldTime = new Date(time);
  const subtraction = (oldTime.getTime() - nowTime.getTime()) / 1000;
  const days = parseInt((subtraction / (24 * 60 * 60)).toString());
  const afterDays = subtraction - days * 24 * 60 * 60;
  const hours = parseInt((afterDays / (60 * 60)).toString());
  return days == 0 ? `${hours} hours` : `${days} days ${hours} hours`;
};

export const getDateString = (date: Date): string => {
  if (date) {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    return `${month}/${newDate.getDate()}/${newDate.getFullYear()}`;
  } else {
    return `0000-01-01`;
  }
};

export const getMonentDate = (date: Date) => {
  if (date) {
    const newDate = new Date(date)
    return moment()
      .set("year", newDate.getFullYear() as number)
      .set("month", (newDate.getMonth() as number))
      .set("date", (newDate.getDate() as number));
  } else {
    return moment().set("year", 1900).set("month", 0).set("day", 1);
  }
};
