import { combineReducers } from 'redux';

import blacklist from './blacklistReducer';
import pageList from './pageListReducer';
import pageAction from './pageActionReducer';
import barMain from './barMainReducer';

const rootReducer = combineReducers({
  blacklist,
  pageList,
  pageAction,
  barMain,
});

export default rootReducer;
