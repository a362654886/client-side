import Axios from "axios";
import { backEndLink } from "../globalValues";
import { NewType } from "../types/NewsType";

const basicURL = backEndLink;

export const newAdd = async (news: NewType): Promise<number | null> => {
  const endpoint = basicURL + "newInsert";
  return Axios.post(endpoint, { newBody: news })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const newAllGet = async (
  value: string,
  page: number,
  pageSize: number
): Promise<{
  result: NewType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `newsGet?searchValue=${value}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const newGet = async (id: string): Promise<NewType | null> => {
  const endpoint = basicURL + `newGet?id=${id}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const newUpdate = async (news: NewType): Promise<number | null> => {
  const endpoint = basicURL + "newUpdate";
  return Axios.put(endpoint, { newBody: news })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const newDelete = async (newId: string): Promise<number | null> => {
  const endpoint = basicURL + `newDelete?newId=${newId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
