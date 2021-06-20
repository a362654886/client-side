import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Label, UpdateLabel, UserLabel } from "../types/Label";

const basicURL = backEndLink;

export const getAllLabels = async (
  searchName: string,
  searchValue: string
): Promise<Label[] | null> => {
  const endpoint =
    basicURL + `labelsGet?searchName=${searchName}&searchValue=${searchValue}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const userLabelsAdd = async (labels: UserLabel[]): Promise<null> => {
  const endpoint = basicURL + "userLabelsInsert";
  return Axios.post(endpoint, {
    labels: labels,
  })
    .then(() => {
      return null;
    })
    .catch(() => {
      return null;
    });
};

export const labelAdd = async (label: Label): Promise<number | null> => {
  const endpoint = basicURL + "labelInsert";
  return Axios.post(endpoint, { label: label })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const userLabelsUpdate = async (
  labels: UpdateLabel[]
): Promise<UserLabel[] | null> => {
  const endpoint = basicURL + "userLabelUpdate";
  return Axios.put(endpoint, { userLabels: labels })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
