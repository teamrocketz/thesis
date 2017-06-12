import React, { Component } from 'react';

import PageListItem from '../components/pageListItem';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
    this.handleClickNextPage = this.handleClickNextPage.bind(this);
  }

  sort(e) {
    this.props.sortPages(e.target.id);
  }

  handleClickPreviousPage() {
    this.props.previousPage();
  }

  handleClickNextPage() {
    if (this.props.currentPage === (this.props.pageRanges.length)) {
      const maxIdOfNextPage = this.props.pageRanges[this.props.currentPage - 1].minId - 1;
      this.props.loadAndShowNextPage(maxIdOfNextPage);
    } else {
      this.props.nextPage();
    }
  }

  render() {
    const renderLoading = () => (
      <div>
        Loading...
      </div>
    );

    const renderPreviousButton = () => (
      <button
        className="btn btn-default btn-primary pull-left"
        onClick={this.handleClickPreviousPage}
      >
        Previous Page
      </button>
    );

    const renderNextButton = () => (
      <button
        className="btn btn-default btn-primary pull-right"
        onClick={this.handleClickNextPage}
      >
        Next Page
      </button>
    );

    const renderList = () => (
      <div className="clearfix">
        <table className="table table-condensed table-striped">
          <thead>
            <tr className="row">
              <th />
              <th>Title</th>
              <th />
              <th>Time visited</th>
              <th>Open since</th>
              <th />
            </tr>
          </thead>
          { this.props.pages.filter(page => (
              page.id >= this.props.pageRanges[this.props.currentPage - 1].minId &&
              page.id <= this.props.pageRanges[this.props.currentPage - 1].maxId
          )).map(page => (
            <PageListItem
              key={page.id}
              page={page}
              addTag={this.props.addTag}
              removeTag={this.props.removeTag}
              deletePage={this.props.deletePage}
            />
          )) }
        </table>
        <div className="clearfix paginationButtons">
          {(this.props.currentPage > 1) ? renderPreviousButton() : []}
          {renderNextButton()}
        </div>
      </div>
    );

    if (this.props.error) {
      return this.props.error;
    }
    return this.props.isLoading ? renderLoading() : renderList();
  }
}

PageList.propTypes = {
  isLoading: React.PropTypes.bool,
  currentPage: React.PropTypes.number,
  pageRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
    minId: React.PropTypes.number,
    maxId: React.PropTypes.number,
  })),
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
  sortPages: React.PropTypes.func,
  removeTag: React.PropTypes.func,
  addTag: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  nextPage: React.PropTypes.func,
  loadAndShowNextPage: React.PropTypes.func,
};

PageList.defaultProps = {
  isLoading: false,
  currentPage: 0,
  pageRanges: [],
  pages: [],
  error: '',
  deletePage: () => {},
  sortPages: () => {},
  removeTag: () => {},
  addTag: () => {},
  previousPage: () => {},
  nextPage: () => {},
  loadAndShowNextPage: () => {},
};

export default PageList;
