import {
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_EDIT_REQUEST,
  COMMENT_DELETE_REQUEST,
} from 'redux/types/comment_types';

// Load
export const loadcommentAction = (postID) => ({
  type: COMMENT_LOADING_REQUEST,
  payload: postID,
});

// Create
export const createcommentAction = (data) => ({
  type: COMMENT_UPLOADING_REQUEST,
  payload: data,
});

// Edit
export const editcommentAction = (userID) => ({
  type: COMMENT_EDIT_REQUEST,
  payload: userID,
});

// Delete
export const deletecommentAction = (data) => ({
  type: COMMENT_DELETE_REQUEST,
  payload: data,
});
