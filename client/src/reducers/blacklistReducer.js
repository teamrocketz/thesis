export default function (state = {
  blacklist: [],
  status: false,
  error: '',
}, action) {
  switch (action.type) {
    case 'BLACKLIST_DOMAIN_PENDING':
      return {
        blacklist: state.blacklist.blacklist,
        status: true,
        error: '',
      };
    case 'BLACKLIST_DOMAIN_REJECTED':
      return {
        blacklist: state.blacklist.blacklist,
        status: false,
        error: action.payload.response.statusText,
      };
    case 'BLACKLIST_DOMAIN_FULFILLED':
      return {
        blacklist: state.blacklist.blacklist,
        status: false,
        error: '',
      };
    default:
      return state;
  }
}
