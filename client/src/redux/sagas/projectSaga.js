import axios from 'axios';
import { push } from 'connected-react-router';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { SEARCH_SUCCESS } from 'redux/types/project_types';
import { LOADING_USER_PROJECT_SUCCESS } from 'redux/types/project_types';
import { LOADING_USER_PROJECT_REQUEST } from 'redux/types/project_types';
import { LOADING_USER_PROJECT_FAILURE } from 'redux/types/project_types';
import { SEARCH_REQUEST } from 'redux/types/project_types';
import { SEARCH_FAILURE } from 'redux/types/project_types';
import { TOP_RATED_PROJECTS_REQUEST } from 'redux/types/project_types';
import { TOP_RATED_PROJECTS_FAILURE } from 'redux/types/project_types';
import { TOP_RATED_PROJECTS_SUCCESS } from 'redux/types/project_types';
import {
  PROJECT_WRITE_REQUEST,
  PROJECT_WRITE_SUCCESS,
  PROJECT_WRITE_FAILURE,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAILURE,
  PROJECT_LOADING_REQUEST,
  PROJECT_LOADING_SUCCESS,
  PROJECT_LOADING_FAILURE,
  PROJECT_EDITPAGE_REQUEST,
  PROJECT_EDITPAGE_SUCCESS,
  PROJECT_EDITPAGE_FAILURE,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  PROJECT_LOADVIEW_REQUEST,
  PROJECT_LOADVIEW_SUCCESS,
  PROJECT_LOADVIEW_FAILURE,
  PROJECT_UPVIEW_REQUEST,
  PROJECT_UPVIEW_SUCCESS,
  PROJECT_UPVIEW_FAILURE,
} from 'redux/types/project_types';

// CREATE project
const createProjectAPI = (payload) => {
  const config = {
    headers: {
      withCredentials: true,
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post('/api/project/write', payload, config);
};

function* createProject(action) {
  try {
    const result = yield call(createProjectAPI, action.payload);

    yield put({
      type: PROJECT_WRITE_SUCCESS,
      payload: result.data,
    });

    window.location.pathname = `project/detail/${result.data._id}`;
  } catch (e) {
    yield put({
      type: PROJECT_WRITE_FAILURE,
      payload: e.response.data.msg,
    });
  }
}

function* watchcreateProject() {
  yield takeEvery(PROJECT_WRITE_REQUEST, createProject);
}

// READ project // Detail
const detailprojectAPI = (payload) => {
  return axios.get(`/api/project/${payload}`);
};

function* detailProject(action) {
  try {
    const result = yield call(detailprojectAPI, action.payload);

    yield put({
      type: PROJECT_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_DETAIL_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectDetail() {
  yield takeEvery(PROJECT_DETAIL_REQUEST, detailProject);
}

// READ project // All
const allprojectAPI = () => {
  return axios.get(`/api/project`);
};

function* allProject(action) {
  try {
    const result = yield call(allprojectAPI, action.payload);

    yield put({
      type: PROJECT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectall() {
  yield takeEvery(PROJECT_LOADING_REQUEST, allProject);
}

// Top Rated Projects
const topRatedProjectsAPI = () => {
  return axios.get(`/api/project/topRate`);
};

function* topRatedProjects(action) {
  try {
    const result = yield call(topRatedProjectsAPI, action.payload);

    yield put({
      type: TOP_RATED_PROJECTS_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TOP_RATED_PROJECTS_FAILURE,
      payload: e,
    });
  }
}

function* watchtopRatedProjects() {
  yield takeEvery(TOP_RATED_PROJECTS_REQUEST, topRatedProjects);
}

// UPDATE project // 수정 페이지
const editprojectAPI = (payload) => {
  return axios.get(`/api/project/${payload}/edit`);
};

function* editProject(action) {
  try {
    const result = yield call(editprojectAPI, action.payload);

    yield put({
      type: PROJECT_EDITPAGE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_EDITPAGE_FAILURE,
      payload: e,
    });
  }
}

function* watcheditproject() {
  yield takeEvery(PROJECT_EDITPAGE_REQUEST, editProject);
}

// UPDATE project // 수정 action
const updateprojectAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post(`/api/project/${payload.id}/update`, payload, config);
};

function* updateProject(action) {
  try {
    const result = yield call(updateprojectAPI, action.payload);

    yield put({
      type: PROJECT_UPDATE_SUCCESS,
      payload: result.data,
    });

    window.location.pathname = `project/detail/${result.data._id}`;
  } catch (e) {
    yield put({
      type: PROJECT_UPDATE_FAILURE,
      payload: e,
    });
  }
}

function* watchupdateproject() {
  yield takeEvery(PROJECT_UPDATE_REQUEST, updateProject);
}

// DELETE project
const deleteprojectAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.delete(`/api/project/${payload.projectID}/delete`, config);
};

function* deleteproject(action) {
  try {
    const result = yield call(deleteprojectAPI, action.payload);

    yield put({
      type: PROJECT_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeleteProject() {
  yield takeEvery(PROJECT_DELETE_REQUEST, deleteproject);
}

// Load User Project
const loadUserprojectAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/project/user/${payload}`);
};

function* loadUserproject(action) {
  try {
    const result = yield call(loadUserprojectAPI, action.payload);

    yield put({
      type: LOADING_USER_PROJECT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOADING_USER_PROJECT_FAILURE,
      payload: e,
    });
  }
}

function* watchloadUserProject() {
  yield takeEvery(LOADING_USER_PROJECT_REQUEST, loadUserproject);
}

// Find Category
const CategoryFindAPI = (payload) => {
  return axios.get(`/api/project/category/${encodeURIComponent(payload)}`);
};

function* CategoryFind(action) {
  try {
    const result = yield call(CategoryFindAPI, action.payload);

    yield put({
      type: CATEGORY_FIND_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CATEGORY_FIND_FAILURE,
      payload: e,
    });
  }
}

function* watchCategoryFind() {
  yield takeEvery(CATEGORY_FIND_REQUEST, CategoryFind);
}

// LOAD VIEW
const loadviewprojectAPI = (payload) => {
  return axios.get(`/api/project/${payload.projectID}/views`);
};

function* loadviewProject(action) {
  try {
    const result = yield call(loadviewprojectAPI, action.payload);

    yield put({
      type: PROJECT_LOADVIEW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_LOADVIEW_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectloadview() {
  yield takeEvery(PROJECT_LOADVIEW_REQUEST, loadviewProject);
}

// UP VIEW
const upviewprojectAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post(`/api/project/${payload.projectID}/views`, payload, config);
};

function* upviewproject(action) {
  try {
    const result = yield call(upviewprojectAPI, action.payload);

    yield put({
      type: PROJECT_UPVIEW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_UPVIEW_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectupview() {
  yield takeEvery(PROJECT_UPVIEW_REQUEST, upviewproject);
}

// Search
const SearchResultAPI = (payload) => {
  return axios.get(`/api/search/${encodeURIComponent(payload)}`);
};

function* SearchResult(action) {
  try {
    const result = yield call(SearchResultAPI, action.payload);

    console.log(result.data);
    yield put({
      type: SEARCH_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SEARCH_FAILURE,
      payload: e,
    });
  }
}

function* watchSearchResult() {
  yield takeEvery(SEARCH_REQUEST, SearchResult);
}

export default function* projectSaga() {
  yield all([
    // project CRUD
    fork(watchcreateProject),
    fork(watchtopRatedProjects),
    fork(watchprojectDetail),
    fork(watchprojectall),
    fork(watcheditproject),
    fork(watchupdateproject),
    fork(watchdeleteProject),
    fork(watchCategoryFind),
    fork(watchSearchResult),
    fork(watchloadUserProject),
    // view
    fork(watchprojectloadview),
    fork(watchprojectupview),
  ]);
}
