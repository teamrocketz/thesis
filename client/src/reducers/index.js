import { combineReducers } from 'redux';

import blacklist from './blacklistReducer';
import pageList from './pageListReducer';
import pageAction from './pageActionReducer';

const rootReducer = combineReducers({
  blacklist,
  pageList,
  pageAction,
});

export default rootReducer;
