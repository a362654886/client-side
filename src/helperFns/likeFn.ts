import { Dispatch } from "react";
import { messagesGet } from "../api/messageApPI";
import { MESSAGES_INI } from "../redux/messages";
import { LikeUpdateType } from "../types/EnumTypes";
import { MessageReturnBody } from "../types/MessageType";

export const getMessagesWithUseLike = async (
  labelId: string,
  page: number,
  pageSize: number,
  userEmail: string,
  type: LikeUpdateType,
  dispatch: Dispatch<any>
): Promise<void> => {
  const messagesResult: MessageReturnBody | null = await messagesGet(
    labelId,
    page,
    pageSize,
    userEmail,
    type
  );
  console.log(messagesResult)
  if (messagesResult) {
    dispatch({
      payload: messagesResult,
      type: MESSAGES_INI,
    });
  }
};
