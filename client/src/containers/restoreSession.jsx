import axios from 'axios';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSession } from '../actions/index';

function loadSession() {
  axios.get('/pageviews/active')
  .then((res) => {
    res.data.forEach((page) => {
      window.open(page.url, '_blank');
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

class RestoreSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <a
        role="button"
        tabIndex="0"
        key="activeSession"
        onClick={loadSession}
        className="btn btn-success pull-right"
      >
        Restore Active Sessions
      </a>
    );
  }

}

function mapStateToProps(state) {
  return {
    pages: state.session.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSession }, dispatch);
}

RestoreSession.propTypes = {
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  getSession: React.PropTypes.func,
};

RestoreSession.defaultProps = {
  pages: [],
  getSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestoreSession);
