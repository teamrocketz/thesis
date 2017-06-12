import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deletePage, sortPages } from '../actions/index';

import BarMain from '../components/barmain';

function mapStateToProps(state) {
  return {
    pages: state.barMain.pages,
    isLoading: state.barMain.isLoading,
    error: state.barMain.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deletePage, sortPages }, dispatch);
}

const BarMainContainer = connect(mapStateToProps, mapDispatchToProps)(BarMain);

export default BarMainContainer;

