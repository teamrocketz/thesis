import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, requestHistory } from '../actions/index';

import PageList from '../components/pageList';

function mapStateToProps(state) {
  return {
    isLoading: state.pageList.isLoading,
    pages: state.pageList.pages,
    error: state.pageList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePage, requestHistory }, dispatch);
}

const PageListContainer = connect(mapStateToProps, mapDispatchToProps)(PageList);

export default PageListContainer;
