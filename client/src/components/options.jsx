import React from 'react';

import BlacklistContainer from '../containers/blacklistContainer';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BlacklistContainer />
      </div>
    );
  }
}

export default Options;
