import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Product } from "../types/ProductType";
import { Video } from "../types/VideoType";

const basicURL = backEndLink;

export const productAdd = async (
  productBody: Product
): Promise<number | null> => {
  const endpoint = basicURL + "productInsert";
  return Axios.post(endpoint, { product: productBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const productAllGet = async (
  anime: string,
  page: number,
  pageSize: number
): Promise<{
  result: Product[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `productsGet?animeId=${anime}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};