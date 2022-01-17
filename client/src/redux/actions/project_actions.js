import {
  PROJECT_WRITE_REQUEST,
  PROJECT_DETAIL_REQUEST,
  PROJECT_LOADING_REQUEST,
  PROJECT_EDITPAGE_REQUEST,
  PROJECT_UPDATE_REQUEST,
  PROJECT_DELETE_REQUEST,
  PROJECT_LOADVIEW_REQUEST,
  PROJECT_UPVIEW_REQUEST,
  TOP_RATED_PROJECTS_REQUEST,
  LOADING_USER_PROJECT_REQUEST,
  ALL_PROJECT_LOADING_REQUEST,
  SEARCH_REQUEST,
} from 'redux/types/project_types';

export const createprojectAction = (data) => ({
  type: PROJECT_WRITE_REQUEST,
  payload: data,
});

export const topRatedProjectsAction = () => ({
  type: TOP_RATED_PROJECTS_REQUEST,
});

export const detailprojectAction = (project_id) => ({
  type: PROJECT_DETAIL_REQUEST,
  payload: project_id,
});

export const editprojectAction = (project_id) => ({
  type: PROJECT_EDITPAGE_REQUEST,
  payload: project_id,
});

export const updateprojectAction = (project_id) => ({
  type: PROJECT_UPDATE_REQUEST,
  payload: project_id,
});

export const deleteprojectAction = (data) => ({
  type: PROJECT_DELETE_REQUEST,
  payload: data,
});

export const readprojectAction = (data) => ({
  type: PROJECT_LOADING_REQUEST,
  payload: data,
});

export const readAllProjectsAction = (data) => ({
  type: ALL_PROJECT_LOADING_REQUEST,
  payload: data,
});

export const loadUserProjectAction = (userId) => ({
  type: LOADING_USER_PROJECT_REQUEST,
  payload: userId,
});

export const loadviewAction = (userID) => ({
  type: PROJECT_LOADVIEW_REQUEST,
  payload: userID,
});

export const upviewAction = (userID) => ({
  type: PROJECT_UPVIEW_REQUEST,
  payload: userID,
});

export const searchAction = (searchTerm) => ({
  type: SEARCH_REQUEST,
  payload: searchTerm,
});
