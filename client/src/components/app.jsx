import React from 'react';
import { Route, Link } from 'react-router-dom';

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
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <SearchInputContainer />
              <PageListContainer />
            </div>
          )}
        />
        <Route
          path="/settings"
          render={() => (
            <div>
              <BlacklistContainer />
              <Link
                to="/"
                role="button"
              >Back to Browser History</Link>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
