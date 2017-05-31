import { combineReducers } from 'redux';
import history from './reducer_pages';
import activePage from './reducer_active_page';

const rootReducer = combineReducers({
  history,
  activePage,
});

export default rootReducer;
