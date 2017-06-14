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
    .then(tags => (
      formatTags(tags.action.payload.data)
    ))
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
    this.props.setQueryField('');
    this.props.tagSearchViewAndRequest(e.label);
  }

  render() {
    return (
      <div className="col-md-3 pull-right">
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
      </div>
    );
  }
}

SearchInput.propTypes = {
  setQueryField: React.PropTypes.func,
  tagSearchViewAndRequest: React.PropTypes.func,
  getTags: React.PropTypes.func,
};

SearchInput.defaultProps = {
  setQueryField: () => {},
  tagSearchViewAndRequest: () => {},
  getTags: () => {},
};

export default SearchInput;
