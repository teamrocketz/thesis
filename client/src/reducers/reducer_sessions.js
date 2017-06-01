export default function (state = {
  isLoading: false,
  pages: [],
  error: '',
}, action) {
  switch (action.type) {
    case 'GET_SESSION_PENDING':
      return {
        isLoading: true,
      };
    case 'GET_SESSION_REJECTED':
      return {
        isLoading: false,
        error: action.payload.response.statusText,
      };
    case 'GET_SESSION_FULFILLED':
      return {
        isLoading: false,
        pages: action.payload.data,
      };
    default:
      return state;
  }
}
