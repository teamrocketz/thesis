export default function (state = null, action) {
  switch (action.type) {
    case 'HISTORY_LOADED':
      return action.payload;
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
