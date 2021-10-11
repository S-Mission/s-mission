import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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

    yield put(push(`detail/${result.data._id}`));
  } catch (e) {
    yield put({
      type: PROJECT_WRITE_FAILURE,
      payload: e,
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

// UPDATE project // 수정 action
const updateprojectAPI = (payload) => {
  return axios.get(`/api/project/${payload}/update`);
};

function* updateProject(action) {
  try {
    const result = yield call(updateprojectAPI, action.payload);

    yield put({
      type: PROJECT_UPDATE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_UPDATE_FAILURE,
      payload: e,
    });
  }
}

function* watchupdateproject() {
  yield takeEvery(PROJECT_EDITPAGE_REQUEST, editProject);
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

export default function* projectSaga() {
  yield all([
    fork(watchcreateProject),
    fork(watchprojectDetail),
    fork(watchprojectall),
    fork(watchupdateproject),
    fork(watchdeleteProject),
  ]);
}
