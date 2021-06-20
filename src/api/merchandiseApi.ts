import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Merchandise, MerchandiseReturnBody } from "../types/MerchandiseType";

const basicURL = backEndLink;

export const merchandiseAdd = async (
  merchandise: Merchandise
): Promise<number | null> => {
  const endpoint = basicURL + "merchandiseInsert";
  return Axios.post(endpoint, { merchandiseBody: merchandise })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const merchandiseQuery = async (
  queryString: string
): Promise<MerchandiseReturnBody | null> => {
  const endpoint = basicURL + `merchandiseQuery?${queryString}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const merchandiseUpdate = async (
  Merchandise: Merchandise
): Promise<MerchandiseReturnBody | null> => {
  const endpoint = basicURL + `merchandiseUpdate`;
  console.log(Merchandise);
  return Axios.put(endpoint, { merchandiseBody: Merchandise })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const merchandisesUpdate = async (
  Merchandises: Merchandise[]
): Promise<MerchandiseReturnBody | null> => {
  const endpoint = basicURL + `merchandisesUpdate`;
  return Axios.put(endpoint, { merchandiseBody: Merchandises })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const merchandisesGet = async (
  page: number,
  pageNum: number,
  sort: string,
  userEmail: string,
  type: string
): Promise<MerchandiseReturnBody | null> => {
  const endpoint =
    basicURL +
    `merchandiseGet?page=${page}&pageNum=${pageNum}&userEmail=${userEmail}&sort=${sort}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const merchandiseDelete = async (
  merchandiseId: string
): Promise<string | null> => {
  const endpoint =
    basicURL + `merchandiseDelete?merchandiseId=${merchandiseId}`;
  return Axios.delete(endpoint)
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};
