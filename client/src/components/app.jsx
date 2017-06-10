import React from 'react';

import BlacklistContainer from '../containers/blacklistContainer';
import PageListContainer from '../containers/pageListContainer';
import SearchInputContainer from '../containers/searchInputContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SearchInputContainer />
        <BlacklistContainer />
        <PageListContainer />
      </div>
    );
  }
}

export default App;
