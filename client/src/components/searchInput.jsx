import React from 'react';

const SearchInput = props => (
  <div>
    {props.requestSearch}
  </div>
);

SearchInput.propTypes = {
  requestSearch: React.PropTypes.func,
};

SearchInput.defaultProps = {
  requestSearch: () => {},
};

export default SearchInput;
