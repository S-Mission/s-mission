import {
  TOP_RATED_POSTS_SUCCESS,
  SEARCH_REQUEST,
  SEARCH_FAILURE,
  LOADING_USER_POST_SUCCESS,
  ALL_POST_LOADING_REQUEST,
  ALL_POST_LOADING_FAILURE,
  ALL_POST_LOADING_SUCCESS,
  LOADING_USER_POST_FAILURE,
  LOADING_USER_POST_REQUEST,
  SEARCH_SUCCESS,
  TOP_RATED_POSTS_FAILURE,
  TOP_RATED_POSTS_REQUEST,
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
  CATEGORY_FIND_REQUEST,
  CATEGORY_FIND_SUCCESS,
  CATEGORY_FIND_FAILURE,
  POST_LOADVIEW_REQUEST,
  POST_LOADVIEW_SUCCESS,
  POST_LOADVIEW_FAILURE,
  POST_UPVIEW_REQUEST,
  POST_UPVIEW_SUCCESS,
  POST_UPVIEW_FAILURE,
} from 'redux/types/post_types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  posts: [],
  postList: [],
  topRated: [],
  postdetail: '',
  is_post: false,
  title: '',
  category: [],
  contents: '',
  creator: '',
  fileUrl: '',
  preimages: [],
  date: '',
  errmsg: '',
  categoryFindResult: '',
  views: 0,
  searchResult: '',
  searchBy: '',
  userPost: [],
  postCount: '',
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING_REQUEST:
    case POST_EDITPAGE_REQUEST:
    case POST_DETAIL_REQUEST:
    case POST_WRITE_REQUEST:
    case POST_UPDATE_REQUEST:
    case POST_LOADVIEW_REQUEST:
    case POST_UPVIEW_REQUEST:
    case TOP_RATED_POSTS_REQUEST:
    case LOADING_USER_POST_REQUEST:
    case ALL_POST_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ALL_POST_LOADING_SUCCESS:
      return {
        ...state,
        postList: [...state.postList, ...action.payload.postFindResult],
        postCount: action.payload.postCount,
        isLoading: false,
      };
    case ALL_POST_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case POST_EDITPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_post: true,
        title: action.payload.title,
        contents: action.payload.contents,
        category: action.payload.category,
      };
    case POST_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_post: true, // 프로젝트가 존재
        postdetail: action.payload,
        preimages: action.payload.previewImg,
        creator: action.payload.creator,
        category: action.payload.category,
      };

    case POST_UPDATE_SUCCESS:
    case POST_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };

    case TOP_RATED_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // 여기도 이렇게 할게 아니라 서버에서 3개로 잘라서 와야됨
        topRated: action.payload.slice(0, 3),
      };
    case TOP_RATED_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case POST_DETAIL_FAILURE:
    case POST_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        is_post: false,
      };

    case POST_WRITE_FAILURE:
      alert(action.payload);

      return {
        ...state,
        isLoading: false,
        errmsg: action.payload,
      };

    case POST_LOADVIEW_FAILURE:
    case POST_UPDATE_FAILURE:
    case POST_EDITPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload.e,
      };

    case POST_LOADING_SUCCESS:
      return {
        ...state,
        posts: action.payload.postFindResult,
        is_post: true,
      };

    // Find category
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };
    case CATEGORY_FIND_SUCCESS:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };
    case CATEGORY_FIND_FAILURE:
      return {
        ...state,
        categoryFindResult: action.payload,
        loading: false,
      };

    case LOADING_USER_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        userPost: action.payload,
      };

    case LOADING_USER_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // views
    case POST_UPVIEW_SUCCESS:
    case POST_LOADVIEW_SUCCESS:
      return {
        ...state,
        views: action.payload.views,
        isLoading: false,
      };
    case POST_UPVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload.fail,
      };

    // Search
    case SEARCH_REQUEST:
      return {
        ...state,
        searchBy: action.payload,
        isLoading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: [...state.searchResult, ...action.payload.searchResult],
        searchCount: action.payload.searchCount,
        isLoading: false,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
