import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    console.log(window.history);
  }

  render() {
    return (<div>
      <h1>Hello world</h1>
      <button type="submit" onClick={this.goBack}>GoBack</button>
      </div>);
  }
}

export default View;