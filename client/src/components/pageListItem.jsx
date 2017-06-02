import React from 'react';

// NOTE: pages.time_open is what goes in the "Time Visited" column of the table
const HistoryItem = (props) => {
  let openFor = '';
  if (props.page.is_active) {
    // TODO: set openFor to the actual duration, perhaps using 'timeago' npm module
    openFor = '';
  }

  return (
    <tr>
      <td>
        <button
          type="submit"
          onClick={() => props.deletePage(props.page.id)}
        >
          <img className="page-list-item-icon" src="/assets/x-icon.png" alt="Delete entry" />
        </button>
      </td>
      <td>
        <a
          href={props.page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.page.title}
        </a>
      </td>
      <td>
        <a
          href={props.page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.page.url}
        </a>
      </td>
      <td>{props.page.snippet}</td>
      <td>{props.page.time_open}</td>
      <td>{openFor}</td>
    </tr>
  );
};

HistoryItem.propTypes = {
  page: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  deletePage: React.PropTypes.func,
};

HistoryItem.defaultProps = {
  page: {},
  deletePage: () => {},
};

export default HistoryItem;
