import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, addTag, removeTag, previousPage, nextPage, loadAndShowNextPage } from '../actions/index';

import PageList from '../components/pageList';

function mapStateToProps(state) {
  return {
    pages: state.pageList.pages,
    currentPage: state.pageList.currentPage,
    pageRanges: state.pageList.pageRanges,
    isLoading: state.pageList.isLoading,
    error: state.pageList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deletePage,
    addTag,
    removeTag,
    previousPage,
    nextPage,
    loadAndShowNextPage,
  }, dispatch);
}

const PageListContainer = connect(mapStateToProps, mapDispatchToProps)(PageList);

export default PageListContainer;
