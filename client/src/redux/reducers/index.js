import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import projectReducer from './projectReducer';
import commentReducer from './commentReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    project: projectReducer,
    comment: commentReducer,
  });

export default createRootReducer;
