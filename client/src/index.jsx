import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';

import Root from './components/root';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(promise())(createStore);

/* eslint-disable no-underscore-dangle */
const store = createStoreWithMiddleware(reducers, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

ReactDOM.render(
  <Root store={store} />
  , document.getElementById('root'));
