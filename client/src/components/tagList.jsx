import React from 'react';
import Select from 'react-select';
import { formatTags } from '../containers/tagListContainer';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
    this.handleTagSearch = this.handleTagSearch.bind(this);
    this.loadTags = this.loadTags.bind(this);
  }

  componentWillMount() {
    this.loadTags();
  }

  loadTags() {
    this.props.getTags()
    .then((tags) => { // eslint-disable-line
      return formatTags(tags.action.payload.data);
    })
    .then((formedTags) => {
      this.setState({
        tags: formedTags,
      });
    })
    .catch((err) => {
      console.error('tag error: ', err);
    });
  }

  handleTagSearch(e) {
    this.props.tagSearch(e.label);
  }

  render() {
    return (
      <div className="col-md-4 pull-right">
        <h2>Tags</h2>
        <div className="Select Select--single is-searchable">
          <Select
            name="form-field-name"
            value="Tags"
            clearable={false}
            placeholder="Tags"
            options={this.state.tags}
            onChange={this.handleTagSearch}
          />
        </div>
        <br />
        <button type="button" className="btn btn-link" onClick={this.props.requestHistory}>
          Clear Tags
        </button>
      </div>
    );
  }
}

SearchInput.propTypes = {
  requestHistory: React.PropTypes.func,
  tagSearch: React.PropTypes.func,
  getTags: React.PropTypes.func,
};

SearchInput.defaultProps = {
  requestHistory: () => {},
  tagSearch: () => {},
  getTags: () => {},
};

export default SearchInput;
