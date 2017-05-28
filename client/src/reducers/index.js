import { combineReducers } from 'redux';
import HistoryReducer from './reducer_pages';
import ActivePage from './reducer_active_page';

const rootReducer = combineReducers({
  history: HistoryReducer,
  activePage: ActivePage,
});

export default rootReducer;
