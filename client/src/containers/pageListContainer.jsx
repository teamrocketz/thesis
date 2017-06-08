import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, sortPages, addTag, removeTag } from '../actions/index';

import PageList from '../components/pageList';

function mapStateToProps(state) {
  return {
    pages: state.pageList.pages,
    isLoading: state.pageList.isLoading,
    error: state.pageList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePage, sortPages, addTag, removeTag }, dispatch);
}

const PageListContainer = connect(mapStateToProps, mapDispatchToProps)(PageList);

export default PageListContainer;
