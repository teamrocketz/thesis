import React from 'react';

const HistoryItem = props => (
  <tr>
    <td>
      <button
        type="submit"
        onClick={() => props.deletePage(props.page.id)}
      > Delete
      </button>
    </td>
    <td>{props.page.title}</td>
    <td>{props.page.url}</td>
    <td>{props.page.snippet}</td>
    <td>{props.page.time_open}</td>
    <td>(Duration)</td>
  </tr>
);

HistoryItem.propTypes = {
  page: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  deletePage: React.PropTypes.func,
};

HistoryItem.defaultProps = {
  page: {},
  deletePage: () => {},
};

export default HistoryItem;
