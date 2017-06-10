export default function (state = {
  pages: [],
  currentPage: 0,
  pageRanges: [],
  tags: [],
  isLoading: false,
  error: '',
}, action) {
  switch (action.type) {
    case 'TAG_SEARCH_PENDING':
    case 'REQUEST_HISTORY_PENDING':
    case 'REQUEST_SEARCH_PENDING':
      return {
        pages: state.pages,
        currentPage: 0,
        pageRanges: [],
        tags: state.tags,
        isLoading: true,
        error: '',
      };

    case 'TAG_SEARCH_REJECTED':
    case 'REMOVE_TAG_REJECTED':
    case 'ADD_TAG_REJECTED':
    case 'REQUEST_HISTORY_REJECTED':
    case 'REQUEST_SEARCH_REJECTED':
      return {
        pages: state.pages,
        currentPage: 0,
        pageRanges: [],
        tags: state.tags,
        isLoading: false,
        error: action.payload.response.statusText,
      };
    case 'TAG_SEARCH_FULFILLED':
    case 'REQUEST_HISTORY_FULFILLED':
    case 'REQUEST_SEARCH_FULFILLED':
      return {
        pages: action.payload.data,
        currentPage: 1,
        pageRanges: [{
          minId: action.payload.data[action.payload.data.length - 1].id,
          maxId: action.payload.data[0].id,
        }],
        tags: state.tags,
        isLoading: false,
        error: '',
      };

    case 'PREVIOUS_PAGE':
      return {
        pages: state.pages,
        currentPage: state.currentPage - 1,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: state.isLoading,
        error: state.error,
      };

    case 'NEXT_PAGE':
      return {
        pages: state.pages,
        currentPage: state.currentPage + 1,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: state.isLoading,
        error: state.error,
      };

    case 'LOAD_AND_SHOW_NEXT_PAGE_PENDING':
      return {
        pages: state.pages,
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: true,
        error: state.error,
      };

    case 'LOAD_AND_SHOW_NEXT_PAGE_REJECTED':
      return {
        pages: state.pages,
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: true,
        error: 'Failed to load additional data.',
      };

    case 'LOAD_AND_SHOW_NEXT_PAGE_FULFILLED':
      return {
        pages: state.pages.concat(action.payload.data),
        currentPage: state.currentPage + 1,
        pageRanges: state.pageRanges.concat({
          minId: action.payload.data[action.payload.data.length - 1].id,
          maxId: action.payload.data[0].id,
        }),
        tags: state.tags,
        isLoading: false,
        error: state.error,
      };

    case 'GET_TAGS_FULFILLED':
      return {
        pages: state.pages,
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: action.payload.data,
        isLoading: false,
        error: '',
      };

    case 'DELETE_PAGE_FULFILLED':
      return {
        pages: state.pages.filter(page =>
          page.id !== JSON.parse(action.payload.config.data).id,
        ),
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: false,
        error: '',
      };

    case 'SORT_PAGES':
      return {
        pages: state.pages.sort((x, y) =>
          x[action.payload].charCodeAt(0) - y[action.payload].charCodeAt(0)).slice(0),
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
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
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
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
        currentPage: state.currentPage,
        pageRanges: state.pageRanges,
        tags: state.tags,
        isLoading: false,
        error: '',
      };

    default:
      return state;
  }
}
