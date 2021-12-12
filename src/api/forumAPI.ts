import Axios from "axios";
import { backEndLink } from "../globalValues";
import { ForumItem, ForumSecondItem, ForumType } from "../types/forumType";

const basicURL = backEndLink;

//forum
export const forumAdd = async (
  forumBody: ForumType
): Promise<number | null> => {
  const endpoint = basicURL + "forumInsert";
  return Axios.post(endpoint, { forum: forumBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumUpdate = async (forumBody: {
  _id: string;
  forumId: string;
  text: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "forumUpdate";
  return Axios.put(endpoint, { forum: forumBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumDelete = async (forumId: string): Promise<number | null> => {
  const endpoint = basicURL + `forumDelete?forumId=${forumId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

//forum item

export const forumItemAdd = async (
  forumItemBody: ForumItem
): Promise<number | null> => {
  const endpoint = basicURL + "forumItemInsert";
  return Axios.post(endpoint, { forumItem: forumItemBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumItemUpdate = async (forumBody: {
  _id: string;
  forumId: string;
  text: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "forumItemUpdate";
  return Axios.put(endpoint, { forum: forumBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumItemDelete = async (
  forumId: string
): Promise<number | null> => {
  const endpoint = basicURL + `forumItemDelete?forumItemId=${forumId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

//forum second item

export const forumSecondItemAdd = async (
  forumSecondItemBody: ForumSecondItem
): Promise<number | null> => {
  const endpoint = basicURL + "forumSecondItemInsert";
  return Axios.post(endpoint, { forumSecondItem: forumSecondItemBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumSecondUpdate = async (forumBody: {
  _id: string;
  forumId: string;
  forumSecondItemId: string;
  text: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "forumSecondItemUpdate";
  return Axios.put(endpoint, { forum: forumBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumSecondDelete = async (
  forumId: string
): Promise<number | null> => {
  const endpoint = basicURL + `forumSecondItemDelete?forumSecondItemId=${forumId}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const forumsAllGet = async (
  anime: string,
  page: number,
  pageSize: number
): Promise<{
  result: ForumType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL + `forumsGet?animeId=${anime}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
