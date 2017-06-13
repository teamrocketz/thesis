import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, addTag, removeTag, previousPage, nextPage } from '../actions/index';

import PageList from '../components/pageList';

function mapStateToProps(state) {
  return {
    view: state.pageList.view,
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
  }, dispatch);
}

const PageListContainer = connect(mapStateToProps, mapDispatchToProps)(PageList);

export default PageListContainer;
