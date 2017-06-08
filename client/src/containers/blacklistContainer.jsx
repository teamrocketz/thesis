import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { blacklistDomain, getBlacklist, whitelistDomain } from '../actions/index';
import Blacklist from '../components/blacklist';

export const isDomain = (domain) => {
  if (domain.length === 0 || domain.slice(0, 3) !== 'www') {
    return false;
  }
  return true;
};

function mapStateToProps(state) {
  return {
    blacklist: state.blacklist.blacklist,
    status: state.blacklist.status,
    error: state.blacklist.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ blacklistDomain, getBlacklist, whitelistDomain }, dispatch);
}

const BlacklistContainer = connect(mapStateToProps, mapDispatchToProps)(Blacklist);

export default BlacklistContainer;
