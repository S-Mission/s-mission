import {
  POST_WRITE_REQUEST,
  POST_DETAIL_REQUEST,
  POST_LOADING_REQUEST,
  POST_EDITPAGE_REQUEST,
  POST_UPDATE_REQUEST,
  POST_DELETE_REQUEST,
  POST_LOADVIEW_REQUEST,
  POST_UPVIEW_REQUEST,
  TOP_RATED_POSTS_REQUEST,
  LOADING_USER_POST_REQUEST,
  ALL_POST_LOADING_REQUEST,
  SEARCH_REQUEST,
} from 'redux/types/post_types';

export const createpostAction = (data) => ({
  type: POST_WRITE_REQUEST,
  payload: data,
});

export const topRatedPostsAction = () => ({
  type: TOP_RATED_POSTS_REQUEST,
});

export const detailpostAction = (post_id) => ({
  type: POST_DETAIL_REQUEST,
  payload: post_id,
});

export const editpostAction = (post_id) => ({
  type: POST_EDITPAGE_REQUEST,
  payload: post_id,
});

export const updatepostAction = (post_id) => ({
  type: POST_UPDATE_REQUEST,
  payload: post_id,
});

export const deletepostAction = (data) => ({
  type: POST_DELETE_REQUEST,
  payload: data,
});

export const readpostAction = () => ({
  type: POST_LOADING_REQUEST,
});

export const readAllPostsAction = (data) => ({
  type: ALL_POST_LOADING_REQUEST,
  payload: data,
});

export const loadUserPostAction = (userId) => ({
  type: LOADING_USER_POST_REQUEST,
  payload: userId,
});

export const loadviewAction = (userID) => ({
  type: POST_LOADVIEW_REQUEST,
  payload: userID,
});

export const upviewAction = (userID) => ({
  type: POST_UPVIEW_REQUEST,
  payload: userID,
});

export const searchAction = (searchTerm) => ({
  type: SEARCH_REQUEST,
  payload: searchTerm,
});
