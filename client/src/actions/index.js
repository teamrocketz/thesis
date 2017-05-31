import fetchHistory from '../middleware/historyHelper';

export const SELECT_PAGE = 'SELECT_PAGE';
export const REQUEST_HISTORY = 'REQUEST_HISTORY';
export const RECEIVE_HISTORY = 'RECEIVE_HISTORY';
export const HISTORY_FAILED = 'HISTORY_FAILED';


export const selectPage = page => ({
  type: SELECT_PAGE,
  payload: page,
});

export const requestHistory = () => ({
  type: REQUEST_HISTORY,
});

export const receiveHistory = json => ({
  type: RECEIVE_HISTORY,
  pages: json,
});

export const historyFailed = error => ({
  type: HISTORY_FAILED,
  error,
});

export const fetchHistoryIfNeeded = () => {
  fetchHistory();
  return true;
};
