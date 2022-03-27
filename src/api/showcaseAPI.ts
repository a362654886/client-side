import Axios from "axios";
import { backEndLink } from "../globalValues";
import {
  ShowCaseEnum,
  ShowCaseReply,
  ShowCaseType,
  ShowSecondCaseReply,
} from "../types/showCaseType";
import { TagType } from "../types/tagType";

const basicURL = backEndLink;

export const showCaseAdd = async (
  showcaseBody: ShowCaseType
): Promise<number | null> => {
  const endpoint = basicURL + "showCaseInsert";
  return Axios.post(endpoint, { showCase: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseReplyAdd = async (
  showCaseReplyBody: ShowCaseReply
): Promise<number | null> => {
  const endpoint = basicURL + "showCaseReplyInsert";
  return Axios.post(endpoint, { showCaseReply: showCaseReplyBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseSecondReplyAdd = async (
  showCaseSecondReplyBody: ShowSecondCaseReply
): Promise<number | null> => {
  const endpoint = basicURL + "showCaseSecondReplyInsert";
  return Axios.post(endpoint, { showCaseSecondReply: showCaseSecondReplyBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseAllGet = async (
  type: ShowCaseEnum | string,
  sortType: string,
  page: number,
  pageSize: number,
  userId: string,
  tag: string,
  text: string
): Promise<{
  result: ShowCaseType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `showCasesGet?type=${type}&sortType=${sortType}&page=${page}&pageSize=${pageSize}&userId=${userId}&tag=${tag}&text=${text}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseOneMangaGet = async (
  id: string
): Promise<ShowCaseType> => {
  const endpoint = basicURL + `showcaseOneMangaGet?id=${id}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseReplyGet = async (
  showCaseId: string,
  page: number,
  pageSize: number
): Promise<{
  result: ShowCaseReply[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `showcaseOneGet?showCaseId=${showCaseId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseSecondReplyGet = async (
  replyId: string,
  page: number,
  pageSize: number
): Promise<{
  result: ShowSecondCaseReply[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `showcaseSecondsGet?replyId=${replyId}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseAllGetByArr = async (
  id: string,
  type: string,
  page: number,
  pageSize: number
): Promise<{
  result: ShowCaseType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `showCasesGetByUserArr?userId=${id}&type=${type}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseFollowAllGetByArr = async (
  id: string,
  page: number,
  pageSize: number
): Promise<{
  result: ShowCaseType[];
  count: number;
} | null> => {
  const endpoint =
    basicURL +
    `showCaseFollowGetByUserArr?userId=${id}&page=${page}&pageSize=${pageSize}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};
//update

export const showCaseUpdate = async (showcaseBody: {
  _id: string;
  text: string;
  source: string;
  tags: TagType[];
  imageArr: string[];
}): Promise<number | null> => {
  const endpoint = basicURL + "showCaseUpdate";
  return Axios.put(endpoint, { showCase: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseDescriptionUpdate = async (showcaseBody: {
  _id: string;
  description: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "showCaseUpdate";
  return Axios.put(endpoint, { showCase: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseReplyUpdate = async (showcaseBody: {
  _id: string;
  text: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "showCaseReplyUpdate";
  return Axios.put(endpoint, { showCaseReply: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseSecondReplyUpdate = async (showcaseBody: {
  _id: string;
  text: string;
}): Promise<number | null> => {
  const endpoint = basicURL + "showCaseSecondReplyUpdate";
  return Axios.put(endpoint, { showCaseSecondReply: showcaseBody })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseAwesomeUpdate = async (
  _id: string,
  awesome: number
): Promise<number | null> => {
  const endpoint = basicURL + "showcaseUpdateAwesome";
  return Axios.put(endpoint, { id: _id, awesome: awesome })
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseDelete = async (_id: string): Promise<number | null> => {
  const endpoint = basicURL + `showCaseDelete?id=${_id}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};

export const showCaseMangaDelete = async (
  _id: string
): Promise<number | null> => {
  const endpoint = basicURL + `showCaseMangaDelete?id=${_id}`;
  return Axios.delete(endpoint)
    .then((response) => {
      return response.status;
    })
    .catch(() => {
      return null;
    });
};
