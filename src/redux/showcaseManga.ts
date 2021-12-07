import { createReducer } from "./reducers/reducerFn";
import { Anime } from "../types/Amine";
import { ShowCaseType } from "../types/showCaseType";

//actions

export const SHOWCASE_MANGA_NONE = "SHOWCASE_MANGA_NONE";
export type SHOWCASE_MANGA_NONE = typeof SHOWCASE_MANGA_NONE;

export const SHOWCASE_MANGA_ADD = "SHOWCASE_MANGA_ADD";
export type SHOWCASE_MANGA_ADD = typeof SHOWCASE_MANGA_ADD;

export type showcaseType = SHOWCASE_MANGA_ADD | SHOWCASE_MANGA_NONE;

//action type
export interface ShowcaseMangaNoneAction {
  payload: null;
  type: typeof SHOWCASE_MANGA_NONE;
}

export interface ShowcaseMangaAddAction {
  payload: Anime;
  type: typeof SHOWCASE_MANGA_ADD;
}
export type ShowcaseAction = ShowcaseMangaNoneAction | ShowcaseMangaAddAction;

//action creators
export const actions = {
  showcaseMangaNoneAction: (payload: null): ShowcaseMangaNoneAction => ({
    payload,
    type: SHOWCASE_MANGA_NONE,
  }),
  showcaseMangaAddAction: (payload: Anime): ShowcaseMangaAddAction => ({
    payload,
    type: SHOWCASE_MANGA_ADD,
  }),
};

//reducer
const handlers = {
  SHOWCASE_MANGA_NONE: (
    state: ShowCaseType | null,
    action: ShowcaseMangaNoneAction
  ) => action.payload,
  SHOWCASE_MANGA_ADD: (
    state: ShowCaseType | null,
    action: ShowcaseMangaAddAction
  ) => action.payload,
};

export const mangaState = (
  state: ShowCaseType | null = null,
  action: ShowcaseAction
): ShowCaseType | null =>
  createReducer<ShowCaseType | null>(state, action, handlers);
