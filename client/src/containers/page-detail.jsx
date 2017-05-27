import React from 'react';
import { connect } from 'react-redux';

const PageDetail = (props) => {
  if (!props.page) {
    return <div>Select a page to get started.</div>;
  }
  return (
    <div>
      <h3>Details for: </h3>
      <div>Title: {props.page.title}</div>
      <div>Snippet: {props.page.snippet}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    page: state.activePage,
  };
}

PageDetail.propTypes = {
  page: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
  snippet: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
};

PageDetail.defaultProps = {
  page: {}, // eslint-disable-line react/forbid-prop-types
  title: '', // eslint-disable-line react/forbid-prop-types
  snippet: '', // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps)(PageDetail);
