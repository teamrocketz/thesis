import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
  }

  componentWillMount() {
    this.props.requestHistory();
  }

  handleQueryChange(e) { this.setState({ query: e.target.value }); }

  handleSearchRequest(e) {
    e.preventDefault();
    this.props.requestSearch(e.target.query.value);
  }

  render() {
    return (
      <div>
        <form
          className="navbar-form navbar-left"
          role="search"
          onSubmit={this.handleSearchRequest}
        >
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
          <br />
          <button type="button" className="btn btn-link" onClick={this.props.requestHistory}>
            Show all
          </button>
        </form>
      </div>
    );
  }
}

SearchInput.propTypes = {
  requestHistory: React.PropTypes.func,
  requestSearch: React.PropTypes.func,
};

SearchInput.defaultProps = {
  requestHistory: () => {},
  requestSearch: () => {},
};

export default SearchInput;
