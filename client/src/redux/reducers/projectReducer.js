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

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  projects: [],
  projectdetail: '',
  is_project: false,
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
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_LOADING_REQUEST:
    case PROJECT_EDITPAGE_REQUEST:
    case PROJECT_DETAIL_REQUEST:
    case PROJECT_WRITE_REQUEST:
    case PROJECT_UPDATE_REQUEST:
    case PROJECT_LOADVIEW_REQUEST:
    case PROJECT_UPVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PROJECT_EDITPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_project: true,
        title: action.payload.title,
        contents: action.payload.contents,
        category: action.payload.category,
      };
    case PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_project: true, // 프로젝트가 존재
        projectdetail: action.payload,
        preimages: action.payload.previewImg,
        creator: action.payload.creator,
        category: action.payload.category,
      };

    case PROJECT_UPDATE_SUCCESS:
    case PROJECT_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };

    case PROJECT_DETAIL_FAILURE:
    case PROJECT_LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        is_project: false,
      };

    case PROJECT_LOADVIEW_FAILURE:
    case PROJECT_UPDATE_FAILURE:
    case PROJECT_EDITPAGE_FAILURE:
    case PROJECT_WRITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload.e,
      };

    case PROJECT_LOADING_SUCCESS:
      return {
        ...state,
        projects: action.payload.projectFindResult,
        is_project: true,
      };

    // Find category
    case CATEGORY_FIND_REQUEST:
      return {
        ...state,
        projects: [],
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

    // views
    case PROJECT_UPVIEW_SUCCESS:
    case PROJECT_LOADVIEW_SUCCESS:
      return {
        ...state,
        views: action.payload.views,
        isLoading: false,
      };
    case PROJECT_UPVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload.fail,
      };
    default:
      return state;
  }
};

export default projectReducer;
