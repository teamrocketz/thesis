import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'SHOW_ALL' ? '/' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.object.isRequired, // eslint-disable-line
  children: PropTypes.object.isRequired, // eslint-disable-line
};

export default FilterLink;
