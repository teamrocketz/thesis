import {
  REQUEST_HISTORY,
  RECEIVE_HISTORY, HISTORY_FAILED } from '../actions';

export default function (state = {
  isLoading: false,
  pages: [],
  error: '',
}, action) {
  switch (action.type) {
    case REQUEST_HISTORY:
      return {
        pages: ['Loading results...'],
        isLoading: true,
        error: '',
      };
    case HISTORY_FAILED:
      return {
        pages: ['Failed to load results...'],
        isLoading: false,
        error: action.error,
      };
    case RECEIVE_HISTORY:
      return {
        pages: action.pages,
        isLoading: false,
        error: '',
      };
    default:
      return state;
  }
}
