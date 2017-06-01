/* eslint-env browser */

import React from 'react';

import Header from './header';
import Logout from './logout';
import PageList from '../containers/page-list';
import PageDetail from '../containers/page-detail';
import RestoreSession from '../containers/restore-session';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Logout />
        <RestoreSession />
        <Header />
        <PageList />
        <PageDetail />
      </div>
    );
  }
}

export default App;
