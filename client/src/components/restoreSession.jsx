import React from 'react';

const RestoreSession = props => (
  <a
    key="activeSession"
    role="button"
    onClick={props.openSessionTabs}
    tabIndex="0"
    className="btn btn-success session pull-right"
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
