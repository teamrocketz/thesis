import React, { Component } from 'react';


class BarInfo extends Component {
  constructor(props) {
    super(props);
  }


  render () {

    let currentSite = 'changeMeOnHover'

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">Favorite site: {this.props.favorite}</div>
          <div className="col-sm-4">Total sites visited: {this.props.numberDomains}</div>
          <div className="col-sm-4">Unique pages : {this.props.numberPages}</div>
        </div>
      </div>

    )
  }

}

export default BarInfo;