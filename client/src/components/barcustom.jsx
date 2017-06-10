import React, { Component } from 'react';

import { Bar } from 'victory';



class CustomBar extends Component {
  constructor(props) {
    super(props);
  }


  render () {

    return (
      <Bar
        datum={this.props.datum}
        index={this.props.index}
        scale={this.props.scale}
        style={this.props.style}
        x={this.props.x}
        y={this.props.y}

      />

    )
  }

}

export default CustomBar;