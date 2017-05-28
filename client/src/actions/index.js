export default function selectPage(page) {
  // selectPage is an ActionCreator, it needs to return an action,
  // an object with a type property
  return {
    type: 'PAGE_SELECTED',
    payload: page,
  };
}
