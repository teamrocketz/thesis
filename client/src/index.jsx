import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import App from './components/app';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(promise())(createStore);

/* eslint-disable no-underscore-dangle */
const store = createStoreWithMiddleware(reducers, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
