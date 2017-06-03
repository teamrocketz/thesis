import React from 'react';
import TimeAgo from 'react-timeago';

const MAX_DISPLAY_LENGTH_TITLE = 60;

// NOTE: pages.time_open is what goes in the "Time Visited" column of the table
const PageListItem = (props) => {
  let openSince = <span className="text-muted">(closed)</span>;
  if (props.page.is_active) {
    // TODO: set openSince to the actual duration, perhaps using 'timeago' npm module
    openSince = <TimeAgo date={props.page.time_open} minPeriod="60" />;
  }

  let displayTitle = props.page.title;
  if (displayTitle.length > MAX_DISPLAY_LENGTH_TITLE) {
    displayTitle = `${displayTitle.slice(0, MAX_DISPLAY_LENGTH_TITLE)}...`;
  }

  const dateFormatter = new Intl.DateTimeFormat('en', {
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format;
  const displayTimeOpen = dateFormatter(Date.parse(props.page.time_open));

  return (
    <tr>
      <td>
        <img
          src={props.page.icon}
          width="32"
          height="32"
          alt={props.page.title}
        />
      </td>
      <td>
        <a
          href={props.page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayTitle}
        </a>
      </td>
      <td>{props.page.snippet}</td>
      <td>{displayTimeOpen}</td>
      <td>{openSince}</td>
      <td>
        <button
          type="submit"
          onClick={() => props.deletePage(props.page.id)}
        >
          <img className="page-list-item-icon" src="/assets/x-icon.png" alt="Delete entry" />
        </button>
      </td>
    </tr>
  );
};

PageListItem.propTypes = {
  page: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  deletePage: React.PropTypes.func,
};

PageListItem.defaultProps = {
  page: {},
  deletePage: () => {},
};

export default PageListItem;
