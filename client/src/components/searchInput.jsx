import React from 'react';
import Select from 'react-select';
import { formatTags } from '../containers/searchInputContainer';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [],
      query: '',
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ] };
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
    this.handleTagSearch = this.handleTagSearch.bind(this);
    this.loadTags = this.loadTags.bind(this);
  }

  componentWillMount() {
    this.props.requestHistory();
    this.loadTags();
  }

  loadTags() {
    this.props.getTags()
    .then((tags) => {
      console.log('hey with the tags', tags.action.payload.data);
      return formatTags(tags.action.payload.data);
    })
    .then((formedTags) => {
      console.log('hey inside formed tags', formedTags);
      this.setState({
        tags: formedTags,
      });
    })
    .catch((err) => {
      console.log('tag error: ', err);
    });
  }

  handleQueryChange(e) { this.setState({ query: e.target.value }); }

  handleTagSearch(e) {
    console.log(e);
    this.props.tagSearch(e.label);
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
          </div>
          <div className="Select Select--single is-searchable">
            <h4>Tags</h4>
            <Select
              name="form-field-name"
              value="Tags"
              clearable={false}
              options={this.state.tags}
              onChange={this.handleTagSearch}
            />
          </div>
          <br />
          <button type="button" className="btn btn-link" onClick={this.props.requestHistory}>
            Clear Tag/Search
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
  getTags: React.PropTypes.func,
};

SearchInput.defaultProps = {
  requestHistory: () => {},
  requestSearch: () => {},
  tagSearch: () => {},
  getTags: () => {},
};

export default SearchInput;
