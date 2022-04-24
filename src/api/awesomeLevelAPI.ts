import Axios from "axios";
import { backEndLink } from "../globalValues";
import { AwesomeLevelType } from "../types/awesomeLevel";
import { NewType } from "../types/NewsType";

const basicURL = backEndLink;

export const awesomeLevelAdd = async (
  awesomeLevel: AwesomeLevelType
): Promise<number | null> => {
  const endpoint = basicURL + "awesomeLevelInsert";
  return Axios.post(endpoint, { awesomeLevelBody: awesomeLevel })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const awesomeLevelAllGet = async (): Promise<AwesomeLevelType[]> => {
  const endpoint = basicURL + `awesomeLevelsGet`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const awesomeLevelUpdate = async (
  awesomeLevel: AwesomeLevelType
): Promise<number | null> => {
  const endpoint = basicURL + "awesomeLevelEdit";
  return Axios.put(endpoint, { awesomeLevelBody: awesomeLevel })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const awesomeLevelDelete = async (
  id: string
): Promise<number | null> => {
  const endpoint = basicURL + `awesomeLevelDelete?id=${id}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
