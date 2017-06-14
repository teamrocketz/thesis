import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  historyViewAndRequest,
  searchViewAndRequest,
  getTags,
  tagSearch,
  setQueryField,
} from '../actions/index';
import SearchInput from '../components/searchInput';

export const formatTags = (tags) => { // eslint-disable-line
  return tags.map((tag) => { // eslint-disable-line
    return { value: tag.id, label: tag.name };
  });
};

function mapStateToProps(state) {
  return {
    tags: state.pageList.tags,
    queryField: state.searchInput.queryField,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    historyViewAndRequest,
    searchViewAndRequest,
    getTags,
    tagSearch,
    setQueryField,
  }, dispatch);
}

const SearchInputContainer = connect(mapStateToProps, mapDispatchToProps)(SearchInput);

export default SearchInputContainer;
