import React from 'react';

import Header from './header';
import Logout from './logout';
import BlacklistContainer from '../containers/blacklistContainer';
import PageListContainer from '../containers/pageListContainer';
import RestoreSessionContainer from '../containers/restoreSessionContainer';
import SearchInputContainer from '../containers/searchInputContainer';
import BarMainContainer from '../containers/barMainContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BlacklistContainer />
        <br /><br /><br /><br />
        <Logout />
        <Header />
        <RestoreSessionContainer />
        <SearchInputContainer />
        <BarMainContainer />
        <PageListContainer />
      </div>
    );
  }
}

export default App;
