export default function (state = {
  isLoading: false,
  pages: [],
}, action) {
  switch (action.type) {
    case 'HISTORY_REQUEST':
      return {
        pages: ['Loading results...'],
        isLoading: true,
      };
    case 'HISTORY_FAILURE':
      return {
        pages: ['Failed to load results...'],
        isLoading: false,
      };
    case 'HISTORY_SUCCESS':
      return {
        pages: action.history,
        isLoading: false,
      };
    default:
      return state;
  }
}

// export default function () {
//   return [
//   { title: 'KRON4 News', snippet: 'Best website ever omg it\'s so good' },
//   { title: 'Hack Reactor', snippet: 'Best website ever omg it\'s so good' },
//   { title: 'Porn', snippet: 'Best website ever omg it\'s so good' },
//   { title: 'Mega ultra porn', snippet: 'Best website ever omg it\'s so good' },
//   ];
// }
