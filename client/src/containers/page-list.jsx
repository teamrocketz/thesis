import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPage, getHistory } from '../actions/index';

class PageList extends Component {
  componentWillMount() {
    this.props.getHistory();
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
    pages: state.history,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectPage, getHistory }, dispatch);
}

PageList.propTypes = {
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  selectPage: React.PropTypes.func, // eslint-disable-line react/forbid-prop-types
  getHistory: React.PropTypes.func, // eslint-disable-line react/forbid-prop-types
};

PageList.defaultProps = {
  pages: [], // eslint-disable-line react/forbid-prop-types
  selectPage, // eslint-disable-line react/forbid-prop-types
  getHistory, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
