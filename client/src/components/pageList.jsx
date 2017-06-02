import React, { Component } from 'react';

import PageListItem from '../components/pageListItem';

class PageList extends Component {
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
            <th>Title</th>
            <th>Snippet</th>
            <th>Time visited</th>
            <th>Open for</th>
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
  // isDeleting: React.PropTypes.bool,
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
};

PageList.defaultProps = {
  isLoading: false,
  // isDeleting: false,
  pages: [],
  error: '',
  deletePage: () => {},
};

export default PageList;
