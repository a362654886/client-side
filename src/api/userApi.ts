import { User, UserRate } from "../types/User";
import Axios from "axios";
import { setToken } from "../helperFns/tokenFn";
import { backEndLink } from "../globalValues";
import { Anime } from "../types/Amine";

const basicURL = backEndLink;

export const userAuth = async (
  email: string,
  password: string,
  role: string
): Promise<User | null> => {
  const endpoint = basicURL + "userAuth";
  return Axios.post(endpoint, {
    userEmail: email,
    userPassword: password,
    role: role,
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

export const userAdminGet = async (): Promise<User[] | null> => {
  const endpoint = basicURL + `userAdminGet`;
  return Axios.get(endpoint)
    .then((response) => {
      const user = response.data;
      return user;
    })
    .catch(() => {
      return null;
    });
};

export const userAdminUpdate = async (
  id: string,
  role: string
): Promise<string | null> => {
  const endpoint = basicURL + "userAdminUpdate";
  return Axios.put(endpoint, {
    user: {
      id: id,
      role: role,
    },
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};

export const userBlockGet = async (
  page: number,
  id: string,
  state: boolean
): Promise<{
  result: User[];
  count: number;
}> => {
  const endpoint = basicURL + `userBlockGet?page=${page}&id=${id}&state=${state}`;
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

export const userUpdateBlock = async (
  id: string,
  block: boolean,
  reason: string
): Promise<number> => {
  const endpoint = basicURL + "userUpdateBlock";
  return Axios.put(endpoint, {
    body: {
      id: id,
      block: block,
      blockReason: reason,
    },
  })
    .then(() => {
      return 200;
    })
    .catch(() => {
      return 400;
    });
};

export const userUpdatePassword = async (
  email: string,
  password: string
): Promise<string | null> => {
  const endpoint = basicURL + "userUpdatePassword";
  return Axios.put(endpoint, {
    email: email,
    password: password,
  })
    .then(() => {
      return "success";
    })
    .catch(() => {
      return null;
    });
};

export const userUpdateNotification = async (
  updateUser: User
): Promise<string | null> => {
  const endpoint = basicURL + "userUpdateNotification";
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

export const userUpdateShipAddress = async (
  updateUser: User
): Promise<string | null> => {
  const endpoint = basicURL + "userUpdateShipAddress";
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

export const userFollowsGets = (
  userId: string,
  page: number,
  pageSize: number
): Promise<{
  result: User[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `userFollowGet?userId=${userId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
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
