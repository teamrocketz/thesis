import React from 'react';
import TimeAgo from 'react-timeago';
import TagGenerator from './tagGenerator.jsx';
import Tag from './tag.jsx';

const MAX_TEXT_DISPLAY_LENGTH = 60;

const formatTextField = (field) => {
  if (field.length > MAX_TEXT_DISPLAY_LENGTH) {
    return `${field.slice(0, MAX_TEXT_DISPLAY_LENGTH)}...`;
  }
  return field;
};

// NOTE: pages.time_open is what goes in the "Time Visited" column of the table
const PageListItem = (props) => {
  let openSince = <span className="text-muted">(closed)</span>;
  if (props.page.is_active) {
    // TODO: set openSince to the actual duration, perhaps using 'timeago' npm module
    openSince = <TimeAgo date={props.page.time_open} minPeriod="60" />;
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
        <TagGenerator pageId={props.page.id} addTag={props.addTag} />
      </td>
      <td>
        <a
          href={props.page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {formatTextField(props.page.title)}
        </a>
        {props.page.tags ?
          props.page.tags.map(tag => (
            <Tag
              pageId={props.page.id}
              removeTag={props.removeTag}
              display="inline"
              key={tag.id}
              tagId={tag.id}
              tagName={tag.name}
            />
        )) : null}
      </td>
      <td>{props.page.snippet ? formatTextField(props.page.snippet) : '' }</td>
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
  addTag: React.PropTypes.func,
  removeTag: React.PropTypes.func,
};

PageListItem.defaultProps = {
  page: {},
  deletePage: () => {},
  addTag: () => {},
  removeTag: () => {},
};

export default PageListItem;
