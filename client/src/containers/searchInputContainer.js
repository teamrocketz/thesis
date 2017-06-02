import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestSearch } from '../actions/index';
import SearchInput from '../components/searchInput';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestSearch }, dispatch);
}

const SearchInputContainer = connect(null, mapDispatchToProps)(SearchInput);

export default SearchInputContainer;
