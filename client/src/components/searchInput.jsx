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
        <form onSubmit={this.handleSearchRequest}>
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
          />
          <input type="submit" value="Search" />
        </form>
        <button type="button" onClick={this.props.requestHistory}>
          Show all
        </button>
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
