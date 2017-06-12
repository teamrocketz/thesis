import utils from '../utils';

const initialState = {
  pages: [],
  currentPage: 0,
  pageRanges: [],
  tags: [],
  isLoading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    /*---------------------------------------
      History fetching
    ---------------------------------------*/

    case 'TAG_SEARCH_PENDING':
    case 'REQUEST_HISTORY_PENDING':
    case 'REQUEST_SEARCH_PENDING':
      return utils.updateObject(state, {
        currentPage: 0,
        pageRanges: [],
        isLoading: true,
        error: '',
      });

    case 'TAG_SEARCH_FULFILLED':
    case 'REQUEST_HISTORY_FULFILLED':
    case 'REQUEST_SEARCH_FULFILLED':
      return utils.updateObject(state, {
        pages: action.payload.data,
        currentPage: 1,
        pageRanges: [{
          minId: action.payload.data[action.payload.data.length - 1].id,
          maxId: action.payload.data[0].id,
        }],
        isLoading: false,
      });

    /*---------------------------------------
      Pagination
    ---------------------------------------*/

    case 'PREVIOUS_PAGE':
      return utils.updateObject(state, { currentPage: state.currentPage - 1 });

    case 'SHOW_NEXT_PAGE':
      return utils.updateObject(state, { currentPage: state.currentPage + 1 });

    case 'LOAD_AND_SHOW_NEXT_PAGE_PENDING':
      return utils.updateObject(state, { isLoading: true });

    case 'LOAD_AND_SHOW_NEXT_PAGE_REJECTED':
      return utils.updateObject(state, {
        isLoading: true,
        error: 'Failed to load additional data.',
      });

    case 'LOAD_AND_SHOW_NEXT_PAGE_FULFILLED':
      return utils.updateObject(state, {
        pages: state.pages.concat(action.payload.data),
        currentPage: state.currentPage + 1,
        pageRanges: state.pageRanges.concat({
          minId: action.payload.data[action.payload.data.length - 1].id,
          maxId: action.payload.data[0].id,
        }),
        isLoading: false,
      });

    /*---------------------------------------
      Tags
    ---------------------------------------*/

    case 'GET_TAGS_PENDING':
    case 'ADD_TAG_PENDING':
    case 'REMOVE_TAG_PENDING':
      return state;

    case 'GET_TAGS_FULFILLED':
      return state;

    case 'ADD_TAG_FULFILLED':
      return utils.updateObject(state, {
        pages: state.pages.map((page) => {
          if (page.id === action.payload.data.pageview_id) {
            page.tags.push(action.payload.data);
          }
          return page;
        }),
      });

    case 'REMOVE_TAG_FULFILLED':
      return utils.updateObject(state, {
        pages: state.pages.map((page) => {
          if (page.id === action.payload.data.pageId) {
            page.tags = page.tags.filter(tag => // eslint-disable-line no-param-reassign
              tag.id !== action.payload.data.tagId,
            );
          }
          return page;
        }),
        error: '',
      });

    /*---------------------------------------
      Deletion
    ---------------------------------------*/

    case 'DELETE_PAGE_PENDING':
      return state;

    case 'DELETE_PAGE_FULFILLED':
      return utils.updateObject(state, {
        pages: state.pages.filter(page =>
          page.id !== JSON.parse(action.payload.config.data).id,
        ),
        error: '',
      });

    case 'SORT_PAGES':
      return utils.updateObject(state, {
        pages: state.pages.sort((x, y) =>
          x[action.payload].charCodeAt(0) - y[action.payload].charCodeAt(0)).slice(0),
      });

    /*---------------------------------------
      Asynchronous failures
    ---------------------------------------*/

    case 'TAG_SEARCH_REJECTED':
    case 'REQUEST_HISTORY_REJECTED':
    case 'REQUEST_SEARCH_REJECTED':
    case 'GET_TAGS_REJECTED':
    case 'ADD_TAG_REJECTED':
    case 'REMOVE_TAG_REJECTED':
    case 'DELETE_PAGE_REJECTED':
      return utils.updateObject(state, {
        isLoading: false,
        error: action.payload.response.statusText,
      });

    /*---------------------------------------
      Default
    ---------------------------------------*/

    default:
      return state;
  }
}
