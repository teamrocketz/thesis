export default function (state = {
  pages: [],
  isLoading: false,
  error: '',
}, action) {
  switch (action.type) {
    case 'REQUEST_HISTORY_PENDING':
    case 'REQUEST_SEARCH_PENDING':
      return {
        pages: [],
        isLoading: true,
        error: '',
      };

    case 'REQUEST_HISTORY_REJECTED':
    case 'REQUEST_SEARCH_REJECTED':
      return {
        pages: [],
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

    default:
      return state;
  }
}
