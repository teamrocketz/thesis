import { combineReducers } from 'redux';

import pageList from './pageListReducer';
import pageAction from './pageActionReducer';
import blacklist from './blacklistReducer';

const rootReducer = combineReducers({
  pageList,
  pageAction,
  blacklist,
});

export default rootReducer;
