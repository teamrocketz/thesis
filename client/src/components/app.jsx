import React from 'react';

import BlacklistContainer from '../containers/blacklistContainer';
import PageListContainer from '../containers/pageListContainer';
import RestoreSessionContainer from '../containers/restoreSessionContainer';
import SearchInputContainer from '../containers/searchInputContainer';
import TagListContainer from '../containers/tagListContainer';

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
        <TagListContainer />
        <RestoreSessionContainer />
        <PageListContainer />
      </div>
    );
  }
}

export default App;
