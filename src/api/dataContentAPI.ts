import Axios from "axios";
import { backEndLink } from "../globalValues";

const basicURL = backEndLink;

export const dataContentAllGet = async (
  startDate: number,
  endDate: number
): Promise<
  {
    name: string;
    num: number;
  }[]
> => {
  const endpoint =
    basicURL + `dataContentGet?startDate=${startDate}&endDate=${endDate}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
