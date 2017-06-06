import axios from 'axios';

export const blacklistDomain = domain => ({
  type: 'BLACKLIST_DOMAIN',
  payload: axios.post('/blacklist/add', {
    domain,
  }),
});

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  payload: axios.post('/pageviews/delete', {
    id,
  }),
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

export const sortPages = field => ({
  type: 'SORT_PAGES',
  payload: field,
});
