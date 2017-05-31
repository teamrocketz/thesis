const axios = require('axios');
const action = require('../actions');

export default (dispatch) => {
  console.log('hey from fetchHistory');
  return axios.get('http://localhost:3000/dummy')
    .then((history) => {
      history.json();
    })
    .then((json) => {
      dispatch(action.receiveHistory(json));
    })
    .catch(() => {
      dispatch(action.historyFailed('you blew it!'));
    });
};
