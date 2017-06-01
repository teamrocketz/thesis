import { combineReducers } from 'redux';
import history from './reducer_pages';
import activePage from './reducer_active_page';
import session from './reducer_sessions';

const rootReducer = combineReducers({
  history,
  activePage,
  session,
});

export default rootReducer;
