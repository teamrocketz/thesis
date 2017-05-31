import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPage, fetchHistoryIfNeeded } from '../actions/index';
// import fetchHistoryIfNeeded from '../middleware/historyHelper';
// import getHistory from '../helpers/webHelper';

class PageList extends Component {
  componentWillMount() {
    this.props.fetchHistoryIfNeeded();
  }

  componentDidMount() {
    console.log(this.props.isLoading, this.props);
  }

  renderList() {
    return this.props.pages.map(page =>
      (
        <div
          role="button"
          tabIndex="0"
          key={page.title}
          onClick={() => this.props.selectPage(page)}
          className="list-group-item"
        >
          {page.title}
        </div>
      ),
    );
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.history.isLoading,
    pages: state.history.pages,
    error: state.history.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectPage, fetchHistoryIfNeeded }, dispatch);
}

PageList.propTypes = {
  isLoading: React.PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  selectPage: React.PropTypes.func, // eslint-disable-line react/forbid-prop-types
  fetchHistoryIfNeeded: React.PropTypes.func, // eslint-disable-line react/forbid-prop-types
};

PageList.defaultProps = {
  isLoading: false,
  pages: [], // eslint-disable-line react/forbid-prop-types
  selectPage, // eslint-disable-line react/forbid-prop-types
  fetchHistoryIfNeeded, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
