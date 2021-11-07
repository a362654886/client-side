import { createReducer } from "./reducers/reducerFn";
import { Anime } from "../types/Amine";

//actions

export const ANIME_NONE = "ANIME_NONE";
export type ANIME_NONE = typeof ANIME_NONE;

export const ANIME_ADD = "ANIME_ADD";
export type ANIME_ADD = typeof ANIME_ADD;

export type animeType = ANIME_ADD | ANIME_NONE;

//action type
export interface AnimeNoneAction {
  payload: null;
  type: typeof ANIME_NONE;
}

export interface AnimeAddAction {
  payload: Anime;
  type: typeof ANIME_ADD;
}
export type AnimeAction = AnimeNoneAction | AnimeAddAction;

//action creators
export const actions = {
  animeNoneAction: (payload: null): AnimeNoneAction => ({
    payload,
    type: ANIME_NONE,
  }),
  animeAddAction: (payload: Anime): AnimeAddAction => ({
    payload,
    type: ANIME_ADD,
  }),
};

//reducer
const handlers = {
  ANIME_NONE: (state: Anime | null, action: AnimeNoneAction) => action.payload,
  ANIME_ADD: (state: Anime | null, action: AnimeAddAction) => action.payload
};

export const animeState = (
  state: Anime | null = null,
  action: AnimeAction
): Anime | null => createReducer<Anime | null>(state, action, handlers);
