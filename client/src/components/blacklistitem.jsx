import React from 'react';

const BlacklistItem = props =>
  (
    <tr>
      <td>{props.domain.domain}</td>
      <td>
        <button
          type="submit"
          className="close"
          aria-label="Close"
          onClick={() => props.deleteDomain(props.domain.domain)}
        >
          <span aria-hidden="true">&times;</span>
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
