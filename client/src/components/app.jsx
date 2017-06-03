import React from 'react';

import Header from './header';
import Logout from './logout';
import PageListContainer from '../containers/pageListContainer';
import RestoreSessionContainer from '../containers/restoreSessionContainer';
import SearchInputContainer from '../containers/searchInputContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Logout />
        <Header />
        <RestoreSessionContainer />
        <SearchInputContainer />
        <PageListContainer />
      </div>
    );
  }
}

export default App;
