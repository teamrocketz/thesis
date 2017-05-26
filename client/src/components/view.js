import React from 'react';
import ReactDOM from 'react-dom';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <h1>Hello world</h1>
      </div>);
  }
}

export default View;