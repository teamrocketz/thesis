export const selectPage = page => ({
  // selectPage is an ActionCreator, it needs to return an action,
  // an object with a type property
  type: 'PAGE_SELECTED',
  payload: page,
});

export const historyLoaded = () => ({
  type: 'HISTORY_REQUEST',
});

export const historyPending = error => ({
  type: 'HISTORY_FAILURE',
  error,
});

export const historyFailed = history => ({
  type: 'HISTORY_SUCCESS',
  history,
});
