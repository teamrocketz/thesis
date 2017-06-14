import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestHistory, chartAllResultsDispatcher, chartPageResultsDispatcher } from '../actions/index';

import BarMain from '../components/barmain';

function mapStateToProps(state) {
  return {
    pages: state.pageList.pages,
    currentPage: state.pageList.currentPage,
    pageRanges: state.pageList.pageRanges,
    isLoading: state.pageList.isLoading,
    error: state.pageList.error,
    chartAllResults: state.pageList.chartAllResults,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestHistory, chartAllResultsDispatcher, chartPageResultsDispatcher }, dispatch);
}

const BarMainContainer = connect(mapStateToProps, mapDispatchToProps)(BarMain);

export default BarMainContainer;

