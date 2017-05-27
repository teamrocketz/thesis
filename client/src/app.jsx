/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
