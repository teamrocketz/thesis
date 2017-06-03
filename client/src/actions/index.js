import axios from 'axios';

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  id,
  payload: axios.post('/pageviews/delete', {
    id,
  }),
});

export const getSession = () => ({
  type: 'GET_SESSION',
  payload: axios.get('/pageviews/active'),
});

export const requestHistory = () => ({
  type: 'REQUEST_HISTORY',
  payload: axios.get('/pageviews/'),
});

export const requestSearch = query => ({
  type: 'REQUEST_SEARCH',
  payload: axios.get('/pageviews/search', {
    params: { query },
  }),
});
