export default function (state = {
  pages: [],
  isLoading: false,
  error: '',
}, action) {
  switch (action.type) {
    case 'REQUEST_HISTORY_PENDING':
    case 'REQUEST_SEARCH_PENDING':
      return {
        pages: state.pages,
        isLoading: true,
        error: '',
      };

    case 'REMOVE_TAG_REJECTED':
    case 'ADD_TAG_REJECTED':
    case 'REQUEST_HISTORY_REJECTED':
    case 'REQUEST_SEARCH_REJECTED':
      return {
        pages: state.pages,
        isLoading: false,
        error: action.payload.response.statusText,
      };

    case 'REQUEST_HISTORY_FULFILLED':
    case 'REQUEST_SEARCH_FULFILLED':
      return {
        pages: action.payload.data,
        isLoading: false,
        error: '',
      };

    case 'DELETE_PAGE_FULFILLED':
      return {
        pages: state.pages.filter(page =>
          page.id !== JSON.parse(action.payload.config.data).id,
        ),
        isLoading: false,
        error: '',
      };

    case 'SORT_PAGES':
      return {
        pages: state.pages.sort((x, y) =>
          x[action.payload].charCodeAt(0) - y[action.payload].charCodeAt(0)).slice(0),
        isLoading: false,
        error: '',
      };

    case 'ADD_TAG_FULFILLED':
      return {
        pages: state.pages.map((page) => {
          if (page.id === action.payload.data.pageview_id) {
            page.tags.push(action.payload.data);
          }
          return page;
        }),
        isLoading: false,
        error: '',
      };

    case 'REMOVE_TAG_FULFILLED':
      return {
        pages: state.pages.map((page) => {
          if (page.id === action.payload.data.pageId) {
            page.tags = page.tags.filter(tag => // eslint-disable-line no-param-reassign
              tag.id !== action.payload.data.tagId,
            );
          }
          return page;
        }),
        isLoading: false,
        error: '',
      };

    default:
      return state;
  }
}
