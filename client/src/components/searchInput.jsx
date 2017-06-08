import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.handleTagSearch = this.handleTagSearch.bind(this);
  }

  componentWillMount() {
    this.props.requestHistory();
  }

  handleQueryChange(e) { this.setState({ query: e.target.value }); }

  handleTagSearch(e) {
    console.log(e);
    console.log('searching for tags');
    if (this.state.tag) {
      this.props.tagSearch(this.state.tag);
    }
    this.setState({
      query: '',
    });
  }

  handleSearchRequest(e) {
    e.preventDefault();
    if (e.target.query.value === '') {
      this.props.requestHistory();
    } else {
      this.props.requestSearch(e.target.query.value);
    }
  }

  render() {
    return (
      <div className="col-md-4 pull-left">
        <h2>Search</h2>
        <form
          className="navbar-form navbar-left"
          role="search"
          onSubmit={this.handleSearchRequest}
        >
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQueryChange}
            className="form-control"
          />
          <div className="input-group-btn form-group">
            <button type="submit" className="btn btn-primary">Search</button>
            <button
              type="button"
              onClick={this.handleTagSearch}
              className="btn btn-primary"
            >By Tag</button>
          </div>
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
  tagSearch: React.PropTypes.func,
};

SearchInput.defaultProps = {
  requestHistory: () => {},
  requestSearch: () => {},
  tagSearch: () => {},
};

export default SearchInput;
