import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestHistory, requestSearch, tagSearch } from '../actions/index';
import SearchInput from '../components/searchInput';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestHistory, requestSearch, tagSearch }, dispatch);
}

const SearchInputContainer = connect(null, mapDispatchToProps)(SearchInput);

export default SearchInputContainer;
