import React from 'react';


const BarInfo = props => (
  <div className="container text-center">
    <div className="row">
      <div className="col-sm-4">Favorite Site: <b>{props.favorite}</b></div>
      <div className="col-sm-4">Total Sites Visited: {props.numberDomains}</div>
      <div className="col-sm-4">Unique Pages: {props.numberPages}</div>
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
