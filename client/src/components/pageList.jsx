import React, { Component } from 'react';

import PageListItem from '../components/pageListItem';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort(e) {
    this.props.sortPages(e.target.innerHTML.toLowerCase());
  }

  render() {
    const renderLoading = () => (
      <div>
        Loading...
      </div>
    );

    const renderList = () => (
      <table className="table table-condensed table-striped">
        <thead>
          <tr>
            <th />
            <th onClick={this.sort}>Title</th>
            <th onClick={this.sort}>Snippet</th>
            <th>Time visited</th>
            <th>Open since</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { this.props.pages.map(page => (
            <PageListItem page={page} key={page.id} deletePage={this.props.deletePage} />
          )) }
        </tbody>
      </table>
    );

    if (this.props.error) {
      return this.props.error;
    }
    return this.props.isLoading ? renderLoading() : renderList();
  }
}

PageList.propTypes = {
  isLoading: React.PropTypes.bool,
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
  sortPages: React.PropTypes.func,
};

PageList.defaultProps = {
  isLoading: false,
  pages: [],
  error: '',
  deletePage: () => {},
  sortPages: () => {},
};

export default PageList;
