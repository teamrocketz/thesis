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
    if (e.target.query.value === '') {
      this.props.requestHistory();
    } else {
      this.props.requestSearch(e.target.query.value);
    }
  }

  render() {
    return (
      <div className="row span-12">
        <div className="col-sm-1">
          <button
            type="submit"
            className="btn btn-default"
          >
            <span className="glyphicon glyphicon-search" aria-hidden="false" />
          </button>
        </div>
        <form
          className="col-md-11"
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
        </form>
        <div className="col-sm-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={this.props.requestHistory}
          >
          Show All
          </button>
        </div>
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
