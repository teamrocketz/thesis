import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage } from '../actions/index';

const PageDetail = (props) => {
  if (!props.page) {
    return <div>Select a page to get started.</div>;
  }
  return (
    <div className="span4">
      <h3>Details for: </h3>
      <div>Title: {props.page.title}</div>
      <div>Snippet: {props.page.snippet}</div>
      <button
        type="submit"
        onClick={() => props.deletePage(props.page.id)}
      > Delete
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    page: state.activePage.page,
    isDeleting: state.activePage.isDeleting,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePage }, dispatch);
}

PageDetail.propTypes = {
  page: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
  snippet: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
  deletePage: React.PropTypes.func, // eslint-disable-line react/forbid-prop-types
};

PageDetail.defaultProps = {
  page: {}, // eslint-disable-line react/forbid-prop-types
  title: '', // eslint-disable-line react/forbid-prop-types
  snippet: '', // eslint-disable-line react/forbid-prop-types
  deletePage, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetail);
