import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: `${window.location.href}/logout`,
    };
  }

  render() {
    return (
      <div>
        <a
          href={this.state.logout}
        >
          <h4 className="pull-right">Logout</h4>
        </a>
      </div>
    );
  }
}

export default Logout;
