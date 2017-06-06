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
    case 'GET_BLACKLIST_PENDING':
      return {
        blacklist: state.blacklist.blacklist,
        status: true,
        error: '',
      };
    case 'GET_BLACKLIST_REJECTED':
      return {
        blacklist: state.blacklist.blacklist,
        status: false,
        error: action.payload.response.statusText,
      };
    case 'GET_BLACKLIST_FULFILLED':
      return {
        blacklist: action.payload.data,
        status: false,
        error: '',
      };
    case 'WHITELIST_DOMAIN_PENDING':
      return {
        blacklist: state.blacklist.blacklist,
        status: true,
        error: '',
      };
    case 'WHITELIST_DOMAIN_REJECTED':
      return {
        blacklist: state.blacklist.blacklist,
        status: false,
        error: action.payload.response.statusText,
      };
    case 'WHITELIST_DOMAIN_FULFILLED':
      return {
        blacklist: state.blacklist.filter(domain =>
          domain !== JSON.parse(action.payload.config.data).domain,
        ),
        status: false,
        error: '',
      };
    default:
      return state;
  }
}
