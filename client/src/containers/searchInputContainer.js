import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestHistory, requestSearch, getTags, tagSearch } from '../actions/index';
import SearchInput from '../components/searchInput';

function mapStateToProps(state) {
  return {
    tags: state.pageList.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestHistory, requestSearch, getTags, tagSearch }, dispatch);
}

const SearchInputContainer = connect(mapStateToProps, mapDispatchToProps)(SearchInput);

export default SearchInputContainer;
