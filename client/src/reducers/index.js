import { combineReducers } from 'redux';

import blacklist from './blacklistReducer';
import pageList from './pageListReducer';
import pageAction from './pageActionReducer';
import searchInput from './searchInputReducer';

const rootReducer = combineReducers({
  blacklist,
  pageList,
  pageAction,
  searchInput,
});

export default rootReducer;
