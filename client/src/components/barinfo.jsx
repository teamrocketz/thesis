import React from 'react';

class BarInfo extends React.Component {
  renderChartAllResults() {
    if (this.props.chartAllResults) {
      return (

        <button
          tabIndex={0}
          className="btn-no-outline btn btn-link"
          onClick={this.props.chartPageResultsDispatcher}
        >Show current page history only
        </button>

      );
    }
    if (!this.props.chartAllResults) {
      return (
        <button
          tabIndex={0}
          className="btn-no-outline btn btn-link"
          onClick={this.props.chartAllResultsDispatcher}
        >Show all history
        </button>
      );
    }
    return undefined;
  }

  render() {
    return (
      <div className="container text-center" id="graph-info">
        <div className="row align-middle">
          <div className="col-sm-3 smallbd">Most Visited: {this.props.favorite}</div>
          <div className="col-sm-3 smallbd">Total Sites: {this.props.numberDomains}</div>
          <div className="col-sm-3 smallbd">Unique Pages: {this.props.numberPages}</div>
          <div className="col-sm-3">
            {this.renderChartAllResults()}
          </div>
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

