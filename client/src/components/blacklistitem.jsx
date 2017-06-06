import React from 'react';

const BlacklistItem = props =>
  (
    <tr>
      <td>{props.domain.domain}</td>
      <td>
        <button
          type="submit"
          onClick={() => props.whitelistDomain(props.domain.domain)}
        >
          <img className="page-list-item-icon" src="/assets/x-icon.png" alt="Delete entry" />
        </button>
      </td>
    </tr>
  );


BlacklistItem.propTypes = {
  domain: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  whitelistDomain: React.PropTypes.func,
};

BlacklistItem.defaultProps = {
  domain: {},
  whitelistDomain: () => {},
};

export default BlacklistItem;
