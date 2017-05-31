import axios from 'axios';

export const selectPage = page => ({
  type: 'SELECT_PAGE',
  payload: page,
});

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  payload: axios.post('http://localhost:3000/pageviews/delete', {
    id,
  }),
});

export const fetchHistoryIfNeeded = () => ({
  type: 'REQUEST_HISTORY',
  payload: axios.get('http://localhost:3000/pageviews/'),
});
