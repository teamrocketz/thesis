import { combineReducers } from 'redux';
import history from './reducer_pages';
import pageAction from './reducer_page_action';
import session from './reducer_sessions';

const rootReducer = combineReducers({
  history,
  pageAction,
  session,
});

export default rootReducer;
