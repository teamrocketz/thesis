import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, fetchHistoryIfNeeded } from '../actions/index';

import PageListItem from '../components/pageListItem';

class PageList extends Component {
  componentWillMount() {
    this.props.fetchHistoryIfNeeded();
  }

  componentDidMount() {
  }

  render() {
    const renderLoading = () => (
      <div>
        Loading...
      </div>
    );

    const renderList = () => (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Snippet</th>
            <th>Time visited</th>
            <th>Time open</th>
          </tr>
        </thead>
        <tbody>
          { this.props.pages.map(page => (
            <PageListItem page={page} key={page.id} deletePage={this.props.deletePage} />
          )) }
        </tbody>
      </table>
    );

    if (this.props.error) {
      return this.props.error;
    }
    return this.props.pages.isLoading ? renderLoading() : renderList();
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
  return bindActionCreators({ deletePage, fetchHistoryIfNeeded }, dispatch);
}

PageList.propTypes = {
  isLoading: React.PropTypes.bool,
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
  fetchHistoryIfNeeded: React.PropTypes.func,
};

PageList.defaultProps = {
  isLoading: false,
  pages: [],
  error: '',
  deletePage,
  fetchHistoryIfNeeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
