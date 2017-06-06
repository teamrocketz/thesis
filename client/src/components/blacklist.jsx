import React from 'react';

class Blacklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: '' };
    this.addBlacklist = this.addBlacklist.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
  }

  handleDomainChange(e) {
    this.setState({ domain: e.target.value });
  }

  addBlacklist(e) {
    e.preventDefault();
    if (this.state.domain.length > 0) {
      this.props.blacklistDomain(this.state.domain);
    }
  }

  render() {
    return (
      <div className="col-md-4 pull-left">
        <h5>Blacklist</h5>
        <form
          className="navbar-form navbar-left"
          onSubmit={this.addBlacklist}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="domain"
              value={this.state.domain}
              onChange={this.handleDomainChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add to blacklist</button>
          <br />
        </form>
      </div>
    );
  }
}

Blacklist.propTypes = {
  blacklistDomain: React.PropTypes.func,
};

Blacklist.defaultProps = {
  blacklistDomain: () => {},
};

export default Blacklist;
