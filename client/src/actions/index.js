// const axios = require('axios');

export const selectPage = page => ({
  // selectPage is an ActionCreator, it needs to return an action,
  // an object with a type property
  type: 'PAGE_SELECTED',
  payload: page,
});

export const getHistory = () => ({
  // axios({
  //   method: 'get',
  //   uri: 'http://localhost.com/3000/webpage/dummy'
  // })
  // .then(data => {
  //   console.log(data);
  //   return {
  //     type: 'HISTORY_LOADED',
  //     payload: history,
  //   };
  // })
  // .catch(err => {
  //   throw new Error(err);
  // });
});
