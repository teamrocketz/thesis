import axios from 'axios';

export const blacklistDomain = domain => ({
  type: 'BLACKLIST_DOMAIN',
  payload: axios.post('/blacklist/add', {
    domain,
  }),
});

export const whitelistDomain = domain => ({
  type: 'WHITELIST_DOMAIN',
  payload: axios.post('/blacklist/delete', {
    domain,
  }),
});

export const getBlacklist = () => ({
  type: 'GET_BLACKLIST',
  payload: axios.get('/blacklist/'),
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

export const previousPage = () => ({
  type: 'PREVIOUS_PAGE',
});

export const nextPage = () => ({
  type: 'SHOW_NEXT_PAGE',
});

export const loadAndShowNextPage = maxId => ({
  type: 'LOAD_AND_SHOW_NEXT_PAGE',
  payload: axios.get('/pageviews', {
    params: { maxId },
  }),
});

export const getTags = () => ({
  type: 'GET_TAGS',
  payload: axios.get('/tags/'),
});

export const tagSearch = query => ({
  type: 'TAG_SEARCH',
  payload: axios.post('/tags/search', {
    query,
  }),
});

export const addTag = (name, pageId) => ({
  type: 'ADD_TAG',
  payload: axios.post('/tags/addtag', {
    name,
    pageId,
  }),
});

export const removeTag = (name, pageId, tagId) => ({
  type: 'REMOVE_TAG',
  payload: axios.post('/tags/removeTag', {
    name,
    pageId,
    tagId,
  }),
});
