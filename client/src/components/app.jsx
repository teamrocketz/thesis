import React from 'react';
import { Route } from 'react-router-dom';

import BlacklistContainer from '../containers/blacklistContainer';
import PageListContainer from '../containers/pageListContainer';
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
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <SearchInputContainer />
              <BarMainContainer />
              <PageListContainer />
            </div>
          )}
        />
        <Route
          path="/settings"
          render={() => (
            <div>
              <BlacklistContainer />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
