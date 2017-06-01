import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <a
          href="http://localhost:3000/webpage/logout"
        >
          <h4>Logout</h4>
        </a>
      </div>
    );
  }
}

export default Logout;
