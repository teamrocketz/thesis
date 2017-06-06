import React from 'react';

const BlacklistItem = props =>
  (
    <tr>
      <td>{props.domain.domain}</td>
      <td>
        <button
          type="submit"
          onClick={() => props.deleteDomain(props.domain.domain)}
        >
          <img className="page-list-item-icon" src="/assets/x-icon.png" alt="Delete entry" />
        </button>
      </td>
    </tr>
  );


BlacklistItem.propTypes = {
  domain: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  deleteDomain: React.PropTypes.func,
};

BlacklistItem.defaultProps = {
  domain: {},
  deleteDomain: () => {},
};

export default BlacklistItem;
