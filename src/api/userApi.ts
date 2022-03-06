import { User, UserRate } from "../types/User";
import Axios from "axios";
import { setToken } from "../helperFns/tokenFn";
import { backEndLink } from "../globalValues";
import { Anime } from "../types/Amine";

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

export const userGet = async (id: string): Promise<User | null> => {
  const endpoint = basicURL + `userGet?id=${id}`;
  return Axios.get(endpoint)
    .then((response) => {
      const user = response.data;
      return user;
    })
    .catch(() => {
      return null;
    });
};

export const userAwesomeGet = async (): Promise<User[] | null> => {
  const endpoint = basicURL + "usersGetByAwesome";
  return Axios.get(endpoint)
    .then((response) => {
      if (response.data.user != null) {
        setToken(response.data.token);
      }
      const user = response.data;
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

export const userUpdateFollow = async (
  userId: string,
  followArr: string[]
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateFollows";
  return Axios.put(endpoint, { id: userId, follows: followArr })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateFollowUsers = async (
  userId: string,
  followUserArr: string[],
  followById: string
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateFollowUsers";
  return Axios.put(endpoint, {
    id: userId,
    userFollow: followUserArr,
    followById: followById,
  })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateAwesome = async (
  userId: string,
  add: boolean
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateAwesome";
  return Axios.put(endpoint, { _id: userId, add: add })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateRate = async (
  id: string,
  rate: UserRate[]
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateRate";
  return Axios.put(endpoint, {
    userBody: {
      userEmail: id,
      userRate: rate,
    },
  })
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

export const userUpdateMarket = async (
  userId: string,
  likeArr: string[]
): Promise<number | null> => {
  const endpoint = basicURL + "userUpdateMarket";
  return Axios.put(endpoint, { id: userId, followMarket: likeArr })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

//user get likes/showcase/marketplace/mall

export const userGetUserLikes = (
  userId: string,
  page: number,
  pageSize: number
): Promise<Anime[] | null> => {
  const endpoint =
    basicURL +
    `animeAllGetByUserLike?id=${userId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
