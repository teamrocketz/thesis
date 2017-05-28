/* eslint-env browser */

import React from 'react';

import Header from './header';
import PageList from '../containers/page-list';
import PageDetail from '../containers/page-detail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <PageList />
        <PageDetail />
      </div>
    );
  }
}

export default App;
