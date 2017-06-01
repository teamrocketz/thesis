import axios from 'axios';

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  payload: axios.post('/pageviews/delete', {
    id,
  }),
});

export const fetchHistoryIfNeeded = () => ({
  type: 'REQUEST_HISTORY',
  payload: axios.get('/pageviews/'),
});

export const getSession = () => ({
  type: 'GET_SESSION',
  payload: axios.get('/pageviews/active'),
});
