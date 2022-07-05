import { createReducer } from "./reducers/reducerFn";
import { Anime } from "../types/Amine";
import { cloneDeep } from "lodash";

//actions

export const ANIME_NONE = "ANIME_NONE";
export type ANIME_NONE = typeof ANIME_NONE;

export const ANIME_ADD = "ANIME_ADD";
export type ANIME_ADD = typeof ANIME_ADD;

export const ANIME_UPDATE_LIKE = "ANIME_UPDATE_LIKE";
export type ANIME_UPDATE_LIKE = typeof ANIME_UPDATE_LIKE;

export type animeType = ANIME_ADD | ANIME_NONE | ANIME_UPDATE_LIKE;

//action type
export interface AnimeNoneAction {
  payload: null;
  type: typeof ANIME_NONE;
}

export interface AnimeAddAction {
  payload: Anime;
  type: typeof ANIME_ADD;
}

export interface AnimeUpdateAction {
  payload: number;
  type: typeof ANIME_UPDATE_LIKE;
}

export type AnimeAction = AnimeNoneAction | AnimeAddAction | AnimeUpdateAction;

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
  AnimeUpdateAction: (payload: number): AnimeUpdateAction => ({
    payload,
    type: ANIME_UPDATE_LIKE,
  }),
};

//reducer
const handlers = {
  ANIME_NONE: (state: Anime | null, action: AnimeNoneAction) => action.payload,
  ANIME_ADD: (state: Anime | null, action: AnimeAddAction) => {
    const anime = cloneDeep(action.payload);
    return anime;
  },
  ANIME_UPDATE_LIKE: (state: Anime | null, action: AnimeUpdateAction) => {
    const anime = cloneDeep(state);
    if (anime) {
      anime.likes = anime.likes + action.payload;
    }
    return anime;
  },
};

export const animeState = (
  state: Anime | null = null,
  action: AnimeAction
): Anime | null => createReducer<Anime | null>(state, action, handlers);
