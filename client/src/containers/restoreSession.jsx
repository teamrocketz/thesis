import React from 'react';

const RestoreSession = props => (
  <a
    role="button"
    tabIndex="0"
    key="activeSession"
    onClick={props.openSessionTabs}
    className="btn btn-success pull-right"
  >
    Restore Active Sessions
  </a>
);

RestoreSession.propTypes = {
  openSessionTabs: React.PropTypes.func,
};

RestoreSession.defaultProps = {
  openSessionTabs: () => {},
};

export default RestoreSession;
