import { COMMENT_DELETE_SUCCESS } from 'redux/types/comment_types';
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_LOADING_SUCCESS,
  COMMENT_LOADING_FAILURE,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_UPLOADING_SUCCESS,
  COMMENT_UPLOADING_FAILURE,
} from 'redux/types/comment_types';

const initialState = {
  comments: [],
  creatorId: '',
  loading: false,
  isAuthenticated: false,
  errorMsg: '',
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
    case COMMENT_UPLOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case COMMENT_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };

    case COMMENT_UPLOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
        isAuthenticated: true,
      };

    case COMMENT_DELETE_SUCCESS:
      window.location.reload();

      return {
        ...state,
      };

    case COMMENT_LOADING_FAILURE:
    case COMMENT_UPLOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default commentReducer;
