import React from 'react';


const BarInfo = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-4">Favorite site: {props.favorite}</div>
      <div className="col-sm-4">Total sites visited: {props.numberDomains}</div>
      <div className="col-sm-4">Unique pages : {props.numberPages}</div>
    </div>
  </div>
);


export default BarInfo;

BarInfo.propTypes = {
  favorite: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
  numberDomains: React.PropTypes.number,
  numberPages: React.PropTypes.number,
};

BarInfo.defaultProps = {
  favorite: '',
  numberDomains: 0,
  numberPages: 0,
};
