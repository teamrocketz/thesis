// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = {
  isDeleting: false,
  page: {},
  error: '',
}, action) {
  switch (action.type) {
    case 'SELECT_PAGE':
      return {
        page: action.payload,
        isDeleting: false,
      };
    case 'DELETE_PAGE_PENDING':
      return {
        isDeleting: true,
      };
    case 'DELETE_PAGE_REJECTED':
      return {
        isDeleting: false,
        error: action.payload.response.statusText,
      };
    case 'DELETE_PAGE_FULFILLED':
      return {
        isDeleting: false,
      };
    default:
      return state;
  }
}
