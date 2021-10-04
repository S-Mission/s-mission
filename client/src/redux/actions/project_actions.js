import {
  PROJECT_WRITE_REQUEST,
  PROJECT_DETAIL_REQUEST,
  PROJECT_LOADING_REQUEST,
  PROJECT_EDITPAGE_REQUEST,
  PROJECT_UPDATE_REQUEST,
  PROJECT_DELETE_REQUEST,
} from 'redux/types/project_types';

export const createprojectAction = (data) => ({
  type: PROJECT_WRITE_REQUEST,
  payload: data,
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
