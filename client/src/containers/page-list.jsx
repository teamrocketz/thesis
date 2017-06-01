import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPage, fetchHistoryIfNeeded } from '../actions/index';

class PageList extends Component {
  componentWillMount() {
    this.props.fetchHistoryIfNeeded();
  }

  componentDidMount() {
  }

  renderList() {
    if (this.props.pages.isLoading) {
      return <div>Loading...</div>;
    }
    return this.props.pages.map((page) => {
      if (page.is_active) {
        return (
          <a
            role="button"
            tabIndex="0"
            key={page.id}
            onClick={() => this.props.selectPage(page)}
            className="list-group-item"
            style={{ backgroundColor: '#5cb85c', color: 'black' }}
          >
            {page.title}
          </a>
        );
      }
      return (
        <a
          role="button"
          tabIndex="0"
          key={page.id}
          onClick={() => this.props.selectPage(page)}
          className="list-group-item"
        >
          {page.title}
        </a>
      );
    },
    );
  }

  render() {
    return (
      <ul className="list-group col-md-8">
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
