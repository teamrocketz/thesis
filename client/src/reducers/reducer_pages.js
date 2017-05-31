export default function (state = {
  isLoading: false,
  pages: [],
  error: '',
}, action) {
  switch (action.type) {
    case 'REQUEST_HISTORY_PENDING':
      return {
        pages: ['Loading results...'],
        isLoading: true,
        error: '',
      };
    case 'REQUEST_HISTORY_REJECTED':
      return {
        pages: ['Failed to load results...'],
        isLoading: false,
        error: action.error,
      };
    case 'REQUEST_HISTORY_FULFILLED':
      return {
        pages: action.payload.data,
        isLoading: false,
        error: '',
      };
    default:
      return state;
  }
}
