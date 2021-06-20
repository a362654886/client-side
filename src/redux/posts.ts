import { createReducer } from "./reducers/reducerFn";
import { User } from "../types/User";
import { Post } from "../types/PostType";

//actions

export const POSTS_INI = "POSTS_INI";
export type POSTS_INI = typeof POSTS_INI;

export const POST_ADD = "POST_ADD";
export type POST_ADD = typeof POST_ADD;

export const POSTS_UPDATE = "POSTS_UPDATE";
export type POSTS_UPDATE = typeof POSTS_UPDATE;

export type postsType = POSTS_INI | POST_ADD;

//action type
export interface PostsINIAction {
  payload: Post[];
  type: typeof POSTS_INI;
}

export interface PostsAddAction {
  payload: Post;
  type: typeof POST_ADD;
}

export interface PostsUpdateAction {
  payload: number;
  type: typeof POSTS_UPDATE;
}

export type PostsAction = PostsINIAction | PostsAddAction | PostsUpdateAction;

//action creators
export const actions = {
  postsIniAction: (payload: Post[]): PostsINIAction => ({
    payload,
    type: POSTS_INI,
  }),
  PostsAddAction: (payload: Post): PostsAddAction => ({
    payload,
    type: POST_ADD,
  }),
  PostsUpdateAction: (payload: number): PostsUpdateAction => ({
    payload,
    type: POSTS_UPDATE,
  }),
};

//reducer
const handlers = {
  POSTS_INI: (state: Post[], action: PostsINIAction) => action.payload,
  POST_ADD: (state: Post[], action: PostsAddAction) => {
    const newPosts = state;
    newPosts.unshift(action.payload);
    return newPosts;
  },
  POSTS_UPDATE: (state: Post[], action: PostsUpdateAction) => {
    const newPosts = state;
    const newPost = newPosts[action.payload];
    newPost.like = !newPost.like;
    newPost.likeNum = newPost.like ? newPost.likeNum + 1 : newPost.likeNum - 1;
    newPosts[action.payload] = newPost
    console.log(newPosts)
    return newPosts;
  },
};

export const postsState = (state: Post[] = [], action: PostsAction): Post[] =>
  createReducer<Post[]>(state, action, handlers);
