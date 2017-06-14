import React from 'react';

class BarInfo extends React.Component {
  renderChartAllResults() {
    if (this.props.chartAllResults) {
      return (
        <div
          role="button"
          tabIndex={0}
          className="col-sm-4"
          onClick={this.props.chartPageResultsDispatcher}
        >Show current page history only
        </div>
      );
    }
    if (!this.props.chartAllResults) {
      return (
        <div
          role="button"
          tabIndex={0}
          className="col-sm-4"
          onClick={this.props.chartAllResultsDispatcher}
        >Show all history
        </div>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div className="container text-left" id="graph-info">
        <div className="row">
          <div className="col-sm-4">Most Visited: {this.props.favorite}</div>
          <div className="col-sm-4">Total Sites: {this.props.numberDomains}</div>
          <div className="col-sm-4">Unique Pages: {this.props.numberPages}</div>
          {this.renderChartAllResults()}
        </div>
      </div>
    );
  }
}


BarInfo.propTypes = {
  favorite: React.PropTypes.string,
  numberDomains: React.PropTypes.number,
  numberPages: React.PropTypes.number,
  chartAllResults: React.PropTypes.bool,
  chartAllResultsDispatcher: React.PropTypes.func,
  chartPageResultsDispatcher: React.PropTypes.func,
};

BarInfo.defaultProps = {
  favorite: '',
  numberDomains: 0,
  numberPages: 0,
  chartAllResults: false,
  chartAllResultsDispatcher: () => {},
  chartPageResultsDispatcher: () => {},
};

export default BarInfo;

