import React from 'react';

class Blacklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
    };
    this.addBlacklist = this.addBlacklist.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
  }

  addBlacklist() {
    if (this.state.domain.length > 0) {
      this.props.blacklistDomain(this.state.domain);
    }
  }

  handleDomainChange(e) {
    this.setState({ domain: e.target.value });
  }

  render() {
    return (
      <div className="col-md-4 pull-left">
        <form
          className="navbar-form navbar-left"
          role="search"
          onSubmit={this.addBlacklist}
        >
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Add a domain to blacklist:</label>
            <input
              type="text"
              className="form-control"
              name="domain"
              value={this.state.domain}
              onChange={this.handleDomainChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Domain</button>
        </form>
      </div>
    );
  }
}

Blacklist.propTypes = {
  blacklistDomain: React.PropTypes.func,
  // requestSearch: React.PropTypes.func,
};

Blacklist.defaultProps = {
  blacklistDomain: () => {},
  // requestSearch: () => {},
};

export default Blacklist;
