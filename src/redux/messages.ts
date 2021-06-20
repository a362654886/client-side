import { createReducer } from "./reducers/reducerFn";
import { Message, MessageReturnBody } from "../types/MessageType";

//actions

export const MESSAGES_INI = "MESSAGES_INI";
export type MESSAGES_INI = typeof MESSAGES_INI;

export const MESSAGES_ADD = "MESSAGES_ADD";
export type MESSAGES_ADD = typeof MESSAGES_ADD;

export const MESSAGES_UPDATE = "MESSAGES_UPDATE";
export type MESSAGES_UPDATE = typeof MESSAGES_UPDATE;

export type MessagesType = MESSAGES_INI | MESSAGES_ADD | MESSAGES_UPDATE;

//action type
export interface MessagesINIAction {
  payload: MessageReturnBody;
  type: typeof MESSAGES_INI;
}

export interface MessagesAddAction {
  payload: Message;
  type: typeof MESSAGES_ADD;
}

export interface MessagesUpdateAction {
  payload: number;
  type: typeof MESSAGES_UPDATE;
}

export type MessagesAction =
  | MessagesINIAction
  | MessagesAddAction
  | MessagesUpdateAction;

//action creators
export const actions = {
  MessagesIniAction: (payload: MessageReturnBody): MessagesINIAction => ({
    payload,
    type: MESSAGES_INI,
  }),
  MessagesAddAction: (payload: Message): MessagesAddAction => ({
    payload,
    type: MESSAGES_ADD,
  }),
  MessagesUpdateAction: (payload: number): MessagesUpdateAction => ({
    payload,
    type: MESSAGES_UPDATE,
  }),
};

//reducer
const handlers = {
  MESSAGES_INI: (state: MessageReturnBody, action: MessagesINIAction) =>
    action.payload,
  MESSAGES_ADD: (state: MessageReturnBody, action: MessagesAddAction) => {
    const messageBody = state;
    messageBody.messages?.push(action.payload);
    return {
      count: messageBody.count+1,
      messages: messageBody.messages,
    };
  },
  MESSAGES_UPDATE: (state: MessageReturnBody, action: MessagesUpdateAction) => {
    const message = state.messages[action.payload];
    message.like = !message.like;
    message.likeNum = message.like ? message.likeNum + 1 : message.likeNum - 1;
    const newMessageBody = state;
    newMessageBody.messages[action.payload] = message;
    return {
      count: newMessageBody.count,
      messages: newMessageBody.messages,
    };
  },
};

export const messagesState = (
  state: MessageReturnBody = {
    count: 0,
    messages: [],
  },
  action: MessagesAction
): MessageReturnBody =>
  createReducer<MessageReturnBody>(state, action, handlers);
