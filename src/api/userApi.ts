import { User } from "../types/User";
import Axios from "axios";
import { setToken } from "../helperFns/tokenFn";
import { backEndLink } from "../globalValues";

const basicURL = backEndLink;

export const userAuth = async (
  email: string,
  password: string
): Promise<User | null> => {
  const endpoint = basicURL + "userAuth";
  return Axios.post(endpoint, {
    userEmail: email,
    userPassword: password,
  })
    .then((response) => {
      if (response.data.user != null) {
        setToken(response.data.token);
      }
      const user = response.data?.user;
      return user;
    })
    .catch(() => {
      return null;
    });
};

export const userAdd = async (newUser: User): Promise<User | null> => {
  const endpoint = basicURL + "userInsert";
  return Axios.post(endpoint, {
    user: newUser,
  })
    .then((response) => {
      const user: User = response.data.ops[0];
      return user;
    })
    .catch(() => {
      return null;
    });
};

export const userUpdate = async (updateUser: User): Promise<string | null> => {
  const endpoint = basicURL + "userUpdate";
  return Axios.put(endpoint, {
    user: updateUser,
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateLike = async (
  userId: string,
  likeArr: string[]
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateLikes";
  return Axios.put(endpoint, { id: userId, likes: likeArr })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateShowcases = async (
  userId: string,
  likeArr: string[]
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateShowcases";
  return Axios.put(endpoint, { id: userId, likeShowcase: likeArr })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
