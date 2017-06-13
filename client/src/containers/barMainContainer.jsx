import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, sortPages } from '../actions/index';

import BarMain from '../components/barmain';

function mapStateToProps(state) {
  return {
    pages: state.pageList.pages,
    isLoading: state.pageList.isLoading,
    error: state.pageList.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePage, sortPages }, dispatch);
}

const BarMainContainer = connect(mapStateToProps, mapDispatchToProps)(BarMain);

export default BarMainContainer;

