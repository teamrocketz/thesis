import React from 'react';
import TimeAgo from 'react-timeago';
import TagGenerator from './tagGenerator';
import Tag from './tag';

const MAX_TITLE_DISPLAY_LENGTH = 80;
const MAX_SNIPPET_DISPLAY_LENGTH = 200;

const formatTextField = (field, length) => {
  if (field.length > length) {
    return `${field.slice(0, length)}...`;
  }
  return field;
};

// NOTE: pages.time_open is what goes in the "Time Visited" column of the table
const formatter = (value, unit) => {
  let unitVar;
  if (value !== 1) {
    unitVar = `${unit}s`;
  } else {
    unitVar = unit;
  }
  return `${value} ${unitVar}`;
};

const PageListItem = (props) => {
  let openSince = <span className="text-muted">(closed)</span>;
  if (props.page.is_active) {
    // TODO: set openSince to the actual duration, perhaps using 'timeago' npm module
    openSince = (<span>Open for <TimeAgo
      date={props.page.time_open}
      minPeriod="60"
      formatter={formatter}
    /></span>);
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
    <tbody>
      <tr className="row">
        <td>
          <img
            src={props.page.icon}
            width="32"
            height="32"
            alt={props.page.title}
          />
        </td>
        <td className="col-md-4">
          <a
            href={props.page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="title"
          >
            {formatTextField(props.page.title, MAX_TITLE_DISPLAY_LENGTH)}
          </a><br />
          {props.page.tags ?
            props.page.tags.map(tag => (
              <Tag
                key={tag.id}
                tagId={tag.id}
                pageId={props.page.id}
                tagName={tag.name}
                removeTag={props.removeTag}
              />
          )) : null}
        </td>
        <td>
          <TagGenerator pageId={props.page.id} addTag={props.addTag} />
        </td>
        <td>{displayTimeOpen}</td>
        <td>{openSince}</td>
        <td>
          <button
            type="submit"
            className="close"
            aria-label="Close"
            onClick={() => props.deletePage(props.page.id)}
          ><span aria-hidden="true">&times;</span>
          </button>
        </td>
      </tr>
      <tr className="row">
        <td />
        <td className="col-sm-6">{props.page.snippet ? formatTextField(props.page.snippet, MAX_SNIPPET_DISPLAY_LENGTH) : '' }</td>
        <td />
        <td />
        <td />
        <td />
      </tr>
    </tbody>
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
