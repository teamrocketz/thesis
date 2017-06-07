import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { blacklistDomain, getBlacklist, whitelistDomain } from '../actions/index';
import Blacklist from '../components/blacklist';

const formError = (<div className="alert alert-danger fade in">
  <button className="close" type="button" data-dismiss="alert">×</button>
  <strong>Error!</strong><br />
  Please provide a valid domain<br />
  Example: www.domain.com
</div>);

export const isDomain = domain =>
  new Promise((resolve, reject) => {
    if (domain.length > 0 && domain.slice(0, 3) !== 'www') {
      reject(formError);
    }
    resolve();
  });

function mapStateToProps(state) {
  return {
    blacklist: state.blacklist.blacklist,
    status: state.blacklist.status,
    error: state.blacklist.error,
    formError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ blacklistDomain, getBlacklist, whitelistDomain }, dispatch);
}

const BlacklistContainer = connect(mapStateToProps, mapDispatchToProps)(Blacklist);

export default BlacklistContainer;
