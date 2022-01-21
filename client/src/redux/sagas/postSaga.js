import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  ALL_POST_LOADING_REQUEST,
  ALL_POST_LOADING_FAILURE,
  POST_WRITE_REQUEST,
  POST_WRITE_SUCCESS,
  POST_WRITE_FAILURE,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_DETAIL_FAILURE,
  POST_LOADING_REQUEST,
  POST_LOADING_SUCCESS,
  POST_LOADING_FAILURE,
  POST_EDITPAGE_REQUEST,
  POST_EDITPAGE_SUCCESS,
  POST_EDITPAGE_FAILURE,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  POST_LOADVIEW_REQUEST,
  POST_LOADVIEW_SUCCESS,
  POST_LOADVIEW_FAILURE,
  POST_UPVIEW_REQUEST,
  POST_UPVIEW_SUCCESS,
  POST_UPVIEW_FAILURE,
  LOADING_USER_POST_SUCCESS,
  LOADING_USER_POST_REQUEST,
  LOADING_USER_POST_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  TOP_RATED_POSTS_REQUEST,
  TOP_RATED_POSTS_FAILURE,
  TOP_RATED_POSTS_SUCCESS,
  ALL_POST_LOADING_SUCCESS,
} from 'redux/types/post_types';

// All Posts Load
const loadPostsAPI = (payload) => {
  return axios.get(`/api/post/skip/${payload}`);
};

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.payload);

    yield put({
      type: ALL_POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: ALL_POST_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadPosts() {
  yield takeEvery(ALL_POST_LOADING_REQUEST, loadPosts);
}

// CREATE post
const createPostAPI = (payload) => {
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

  return axios.post('/api/post/write', payload, config);
};

function* createPost(action) {
  try {
    const result = yield call(createPostAPI, action.payload);

    yield put({
      type: POST_WRITE_SUCCESS,
      payload: result.data,
    });

    window.location.pathname = `post/detail/${result.data._id}`;
  } catch (e) {
    yield put({
      type: POST_WRITE_FAILURE,
      payload: e.response.data.msg,
    });
  }
}

function* watchcreatePost() {
  yield takeEvery(POST_WRITE_REQUEST, createPost);
}

// READ post // Detail
const detailpostAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* detailPost(action) {
  try {
    const result = yield call(detailpostAPI, action.payload);

    yield put({
      type: POST_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_FAILURE,
      payload: e,
    });
  }
}

function* watchpostDetail() {
  yield takeEvery(POST_DETAIL_REQUEST, detailPost);
}

// READ post // All
const allpostAPI = () => {
  return axios.get('/api/post');
};

function* allPost(action) {
  try {
    const result = yield call(allpostAPI, action.payload);

    yield put({
      type: POST_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchpostall() {
  yield takeEvery(POST_LOADING_REQUEST, allPost);
}

// Top Rated Posts
const topRatedPostsAPI = () => {
  return axios.get(`/api/post/topRate`);
};

function* topRatedPosts(action) {
  try {
    const result = yield call(topRatedPostsAPI, action.payload);

    yield put({
      type: TOP_RATED_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: TOP_RATED_POSTS_FAILURE,
      payload: e,
    });
  }
}

function* watchtopRatedPosts() {
  yield takeEvery(TOP_RATED_POSTS_REQUEST, topRatedPosts);
}

// UPDATE post // 수정 페이지
const editpostAPI = (payload) => {
  return axios.get(`/api/post/${payload}/edit`);
};

function* editPost(action) {
  try {
    const result = yield call(editpostAPI, action.payload);

    yield put({
      type: POST_EDITPAGE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDITPAGE_FAILURE,
      payload: e,
    });
  }
}

function* watcheditpost() {
  yield takeEvery(POST_EDITPAGE_REQUEST, editPost);
}

// UPDATE post // 수정 action
const updatepostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post(`/api/post/${payload.id}/update`, payload, config);
};

function* updatePost(action) {
  try {
    const result = yield call(updatepostAPI, action.payload);

    yield put({
      type: POST_UPDATE_SUCCESS,
      payload: result.data,
    });

    window.location.pathname = `post/detail/${result.data._id}`;
  } catch (e) {
    yield put({
      type: POST_UPDATE_FAILURE,
      payload: e,
    });
  }
}

function* watchupdatepost() {
  yield takeEvery(POST_UPDATE_REQUEST, updatePost);
}

// DELETE post
const deletepostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.delete(`/api/post/${payload.postID}/delete`, config);
};

function* deletepost(action) {
  try {
    const result = yield call(deletepostAPI, action.payload);

    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchdeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, deletepost);
}

// Load User Post
const loadUserpostAPI = (payload) => {
  return axios.get(`/api/post/user/${payload}`);
};

function* loadUserpost(action) {
  try {
    const result = yield call(loadUserpostAPI, action.payload);

    yield put({
      type: LOADING_USER_POST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOADING_USER_POST_FAILURE,
      payload: e,
    });
  }
}

function* watchloadUserPost() {
  yield takeEvery(LOADING_USER_POST_REQUEST, loadUserpost);
}

// Find Category
const CategoryFindAPI = (payload) => {
  return axios.get(`/api/post/category/${encodeURIComponent(payload)}`);
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
const loadviewpostAPI = (payload) => {
  return axios.get(`/api/post/${payload.postID}/views`);
};

function* loadviewPost(action) {
  try {
    const result = yield call(loadviewpostAPI, action.payload);

    yield put({
      type: POST_LOADVIEW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_LOADVIEW_FAILURE,
      payload: e,
    });
  }
}

function* watchpostloadview() {
  yield takeEvery(POST_LOADVIEW_REQUEST, loadviewPost);
}

// UP VIEW
const upviewpostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post(`/api/post/${payload.postID}/views`, payload, config);
};

function* upviewpost(action) {
  try {
    const result = yield call(upviewpostAPI, action.payload);

    yield put({
      type: POST_UPVIEW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_UPVIEW_FAILURE,
      payload: e,
    });
  }
}

function* watchpostupview() {
  yield takeEvery(POST_UPVIEW_REQUEST, upviewpost);
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

export default function* postSaga() {
  yield all([
    // post CRUD
    fork(watchcreatePost),
    fork(watchtopRatedPosts),
    fork(watchpostDetail),
    fork(watchpostall),
    fork(watcheditpost),
    fork(watchupdatepost),
    fork(watchdeletePost),
    fork(watchCategoryFind),
    fork(watchSearchResult),
    fork(watchloadUserPost),
    fork(watchloadPosts),
    // view
    fork(watchpostloadview),
    fork(watchpostupview),
  ]);
}
