import { combineReducers } from 'redux';

import pageList from './pageListReducer';
import pageAction from './pageActionReducer';

const rootReducer = combineReducers({
  pageList,
  pageAction,
});

export default rootReducer;
