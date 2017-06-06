import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { blacklistDomain } from '../actions/index';

import Blacklist from '../components/blacklist';

function mapStateToProps(state) {
  return {
    blacklist: state.blacklist.blacklist,
    status: state.blacklist.status,
    error: state.blacklist.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ blacklistDomain }, dispatch);
}

const BlacklistContainer = connect(mapStateToProps, mapDispatchToProps)(Blacklist);

export default BlacklistContainer;
