import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSession } from '../actions/index';

class RestoreSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadSession = this.loadSession.bind(this);
  }

  componentWillMount() {
    this.props.getSession();
  }

  loadSession() {
    console.log(this.state);
    this.props.pages.forEach((page) => {
      window.open(page.url, '_blank');
    });
  }

  render() {
    return (
      <a
        role="button"
        tabIndex="0"
        key="activeSession"
        onClick={this.loadSession}
        className="btn btn-success"
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
