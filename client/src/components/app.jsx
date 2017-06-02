import React from 'react';

import Header from './header';
import Logout from './logout';
import PageListContainer from '../containers/pageListContainer';
import RestoreSession from '../containers/restoreSession';
// import SearchInputContainer from '../containers/searchInputContainer';

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
        <PageListContainer />
      </div>
    );
        // <SearchInputContainer />
  }
}

export default App;
