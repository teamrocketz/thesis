import axios from 'axios';

const weburl = `${window.location.origin}`;

export const selectPage = page => ({
  type: 'SELECT_PAGE',
  payload: page,
});

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  payload: axios.post(`${weburl}/pageviews/delete`, {
    id,
  }),
});

export const fetchHistoryIfNeeded = () => ({
  type: 'REQUEST_HISTORY',
  payload: axios.get(`${weburl}/pageviews/`),
});

export const getSession = () => ({
  type: 'GET_SESSION',
  payload: axios.get(`${weburl}/pageviews/active`),
});
