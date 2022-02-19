import Axios from "axios";
import { backEndLink } from "../globalValues";
import { MallCustomType } from "../types/mallCustomType";

const basicURL = backEndLink;

export const mallCustomerAPI = async (): Promise<MallCustomType[]> => {
  const endpoint = basicURL + `mallCustomerAllGet`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
