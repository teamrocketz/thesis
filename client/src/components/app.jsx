/* eslint-env browser */

import React from 'react';

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
        <PageList />
        <PageDetail />
      </div>
    );
  }
}

export default App;
