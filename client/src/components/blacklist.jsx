import React from 'react';
import { Link } from 'react-router-dom';
import BlacklistItem from './blacklistitem';
import { isDomain } from '../containers/blacklistContainer';

class Blacklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: '', error: '', formError: false };
    this.addBlacklist = this.addBlacklist.bind(this);
    this.handleDomainChange = this.handleDomainChange.bind(this);
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
    if (!isDomain(this.state.domain)) {
      this.setState({ formError: true });
    } else {
      this.setState({ formError: false });
      this.props.blacklistDomain(this.state.domain)
      .catch((err) => {
        console.log('Blacklist Error: ', err);
      });
    }
  }

  render() {
    let error = '';
    const formError = (<div className="alert alert-danger fade in">
      <strong>Error!</strong><br />
      Please provide a valid domain<br />
      Example: www.domain.com
    </div>);

    if (this.state.formError) { error = formError; }

    return (
      <div className="row text-center">
        <div className="col-md-4" />
        <div className="col-md-4">
          <h3>Blacklist Domains</h3>
          <p>Add a domain to prevent Hault from storing your
          browsing history when viewing these sites</p>
          <form
            className="navbar-form navbar-left"
            onSubmit={this.addBlacklist}
          >
            <div className="form-group">
              <input
                type="text"
                name="domain"
                value={this.state.domain}
                onChange={this.handleDomainChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add to blacklist</button>
            <br />
          </form>
          {error}
          <table className="table table-condensed text-left">
            <thead>
              <tr>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              { this.props.blacklist.map(domain => (
                <BlacklistItem
                  key={domain.id}
                  domain={domain}
                  deleteDomain={this.props.whitelistDomain}
                />
              )) }
            </tbody>
          </table>
          <Link
            to="/"
            role="button"
            className="btn btn-link"
          >Back to Browser History
          </Link>
        </div>
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
