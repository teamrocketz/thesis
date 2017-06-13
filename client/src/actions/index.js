import axios from 'axios';

// helper function for history/search actions
// fetches pageviews from the server

const requestCurrentView = (state) => {
  let url;
  const options = {};

  if (state.pageList.currentPage > (state.pageList.pageRanges.length)) {
    Object.assign(options, {
      maxId: state.pageList.pageRanges[state.pageList.currentPage - 2].minId - 1,
    });
  }

  if (state.pageList.view.isAllHistory) {
    url = '/pageviews';
  } else if (state.pageList.view.isSearch) {
    url = '/pageviews/search';
    Object.assign(options, { query: state.pageList.view.searchQuery });
  } else if (state.pageList.view.isTagSearch) {
    url = '/tags/search';
    Object.assign(options, { query: state.pageList.view.tagSearchQuery });
  }

  if (state.pageList.view.isAllHistory || state.pageList.view.isSearch) {
    return axios.get(url, { params: options });
  } else if (state.pageList.view.isTagSearch) {
    return axios.post(url, options);
  }
  return Promise.reject('Unknown view state');
};

/*---------------------------------------
  History / search requests
---------------------------------------*/

// When initiating a history fetch, we split this into two steps:
// - setting the "view" in the state (is this all history?  a search?  what's the query?)
// - doing the server fetch and updating results
//
// The reason these are two steps is that redux-promise-middleware ONLY retains the “type” and
// “payload” action properties when creating it’s asynchronous actions (_PENDING, _FULFILLED,
// _REJECTED), so those reducers don’t have any info about what the query was.
//
// Updating the view therefore requires a separate synchronous action.

const setAllHistoryView = () => ({ type: 'SET_ALL_HISTORY_VIEW' });
const setSearchView = query => ({ type: 'SET_SEARCH_VIEW', query });
const setTagSearchView = query => ({ type: 'SET_TAG_SEARCH_VIEW', query });

const requestHistory = state => ({
  type: 'REQUEST_HISTORY',
  payload: requestCurrentView(state),
});

const requestSearch = state => ({
  type: 'REQUEST_SEARCH',
  payload: requestCurrentView(state),
});

const tagSearch = state => ({
  type: 'TAG_SEARCH',
  payload: requestCurrentView(state),
});

export const historyViewAndRequest = () => (
  (dispatch, getState) => {
    dispatch(setAllHistoryView());
    dispatch(requestHistory(getState()));
  }
);

export const searchViewAndRequest = query => (
  (dispatch, getState) => {
    dispatch(setSearchView(query));
    dispatch(requestSearch(getState()));
  }
);

export const tagSearchViewAndRequest = query => (
  (dispatch, getState) => {
    dispatch(setTagSearchView(query));
    dispatch(tagSearch(getState()));
  }
);

/*---------------------------------------
  Pagination
---------------------------------------*/

export const previousPage = () => ({
  type: 'DECREMENT_PAGE',
});

export const incrementPage = () => ({
  type: 'INCREMENT_PAGE',
});

export const loadNextPage = state => ({
  type: 'LOAD_NEXT_PAGE',
  payload: requestCurrentView(state),
});

export const nextPage = () => (
  (dispatch, getState) => {
    dispatch(incrementPage());
    const state = getState();
    if (state.pageList.currentPage > state.pageList.pageRanges.length) {
      dispatch(loadNextPage(state));
    }
  }
);

/*---------------------------------------
  Tags
---------------------------------------*/

export const getTags = () => ({
  type: 'GET_TAGS',
  payload: axios.get('/tags/'),
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

/*---------------------------------------
  Other actions
---------------------------------------*/

export const deletePage = id => ({
  type: 'DELETE_PAGE',
  payload: axios.post('/pageviews/delete', {
    id,
  }),
});

/*---------------------------------------
  Blacklist
---------------------------------------*/

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
