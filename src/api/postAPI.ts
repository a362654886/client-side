import Axios from "axios";
import { backEndLink } from "../globalValues";
import { Plate, Post, PostReturnBody } from "../types/PostType";

const basicURL =backEndLink;

export const plateAdd = async (plate: Plate): Promise<number | null> => {
  const endpoint = basicURL + "plateInsert";
  return Axios.post(endpoint, { plate: plate })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const platesGet = async (): Promise<Plate[] | null> => {
  const endpoint = basicURL + "platesGet";
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const postAdd = async (post: Post): Promise<number | null> => {
  const endpoint = basicURL + "postInsert";
  return Axios.post(endpoint, { post: post })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const postsGet = async (
  labelId: string,
  page: number,
  pageNum: number,
  sort: string,
  userEmail: string,
  type: string
): Promise<PostReturnBody> => {
  const endpoint =
    basicURL + `postsGet?labelId=${labelId}&page=${page}&pageNum=${pageNum}&sortBy=${sort}&userEmail=${userEmail}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const postQuery = async (
  labelId: string,
  page: number,
  pageNum: number,
  sort: string,
  userEmail: string,
  type: string
): Promise<PostReturnBody> => {
  const endpoint =
    basicURL + `postsQuery?labelId=${labelId}&page=${page}&pageNum=${pageNum}&sortBy=${sort}&userEmail=${userEmail}&type=${type}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const postUpdate = async (
  post: Post
): Promise<string | null> => {
  const endpoint = basicURL + `postUpdate`;
  return Axios.put(endpoint, {
    post: post,
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};

export const postDelete = async (
  postId: string
): Promise<string | null> => {
  const endpoint = basicURL + `postDelete?postId=${postId}`;
  return Axios.delete(endpoint)
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};
