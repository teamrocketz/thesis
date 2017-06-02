import { combineReducers } from 'redux';

import pageList from './pageListReducer';
import pageAction from './pageActionReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  pageList,
  pageAction,
  session,
});

export default rootReducer;
