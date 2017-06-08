import React from 'react';

const Tag = props => (
  <div className="tag">
    {props.tagName} <button onClick={() => {
      props.removeTag(props.tagName, props.pageId, props.tagId);
    }}
    >&#10006;
    </button>
  </div>
);

export default Tag;

Tag.propTypes = {
  tagName: React.PropTypes.string, // eslint-disable-line react/forbid-prop-types
  tagId: React.PropTypes.number,
  pageId: React.PropTypes.number,
  removeTag: React.PropTypes.func,
};

Tag.defaultProps = {
  tagName: null,
  tagId: null,
  pageId: null,
  removeTag: () => {},
};
