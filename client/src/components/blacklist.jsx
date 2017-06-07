import React from 'react';
import BlacklistItem from './blacklistitem';

class Blacklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: '', error: '' };
    this.addBlacklist = this.addBlacklist.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
    this.isDomain = this.isDomain.bind(this);
  }

  componentWillMount() {
    this.props.getBlacklist();
    this.setState({
      error: '',
    });
  }

  handleDomainChange(e) {
    this.setState({ domain: e.target.value });
  }

  addBlacklist(e) {
    e.preventDefault();
    if (this.state.domain.length > 0 && this.isDomain()) {
      this.props.blacklistDomain(this.state.domain)
      .then(() => {
        this.props.getBlacklist();
        this.setState({
          error: '',
        });
      });
    } else if (!this.isDomain()) {
      this.setState({
        error: (<div className="alert alert-danger fade in">
          <a className="close" data-dismiss="alert">&times;</a>
          <strong>Error!</strong>
          You must provide a valid domain.
          eg: www.domain.com
        </div>),
      });
    }
  }

  isDomain() {
    if (this.state.domain.slice(0, 3) !== 'www') {
      return false;
    }
    return true;
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
        {this.state.error}
        <table className="table table-condensed table-striped">
          <thead>
            <tr>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            { this.props.blacklist.map(domain => (
              <BlacklistItem
                domain={domain}
                key={domain.id}
                deleteDomain={this.props.whitelistDomain}
              />
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Blacklist.propTypes = {
  blacklistDomain: React.PropTypes.func,
  getBlacklist: React.PropTypes.func,
  whitelistDomain: React.PropTypes.func,
  blacklist: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

Blacklist.defaultProps = {
  blacklistDomain: () => {},
  getBlacklist: () => {},
  whitelistDomain: () => {},
  blacklist: [],
};

export default Blacklist;
