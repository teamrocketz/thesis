import React from 'react';

import BlacklistContainer from '../containers/blacklistContainer';
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
        <RestoreSessionContainer />
        <SearchInputContainer />
        <BlacklistContainer />
        <PageListContainer />
      </div>
    );
  }
}

export default App;
