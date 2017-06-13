import React, { Component } from 'react';
import Scroll from 'react-scroll';

import PageListItem from '../components/pageListItem';

class PageList extends Component {
  constructor(props) {
    super(props);
    this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
    this.handleClickNextPage = this.handleClickNextPage.bind(this);
  }

  handleClickPreviousPage() {
    this.props.previousPage();
    Scroll.animateScroll.scrollToTop({ duration: 0, delay: 0 });
  }

  handleClickNextPage() {
    this.props.nextPage();
    Scroll.animateScroll.scrollToTop({ duration: 0, delay: 0 });
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

    let listHeader = '';
    if (this.props.view.isAllHistory) {
      listHeader = `All browsing history: Page ${this.props.currentPage}`;
    } else if (this.props.view.isSearch) {
      listHeader = `Search results for "${this.props.view.searchQuery}": Page ${this.props.currentPage}`;
    } else if (this.props.view.isTagSearch) {
      listHeader = `Entries tagged "${this.props.view.tagSearchQuery}": Page ${this.props.currentPage}`;
    }

    const renderList = () => (
      <div className="clearfix">
        <h3>{listHeader}</h3>
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
  view: React.PropTypes.shape({
    isAllHistory: React.PropTypes.bool,
    isSearch: React.PropTypes.bool,
    isTagSearch: React.PropTypes.bool,
    searchQuery: React.PropTypes.string,
    tagSearchQuery: React.PropTypes.string,
  }),
  pages: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  currentPage: React.PropTypes.number,
  pageRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
    minId: React.PropTypes.number,
    maxId: React.PropTypes.number,
  })),
  isLoading: React.PropTypes.bool,
  error: React.PropTypes.string,
  deletePage: React.PropTypes.func,
  removeTag: React.PropTypes.func,
  addTag: React.PropTypes.func,
  previousPage: React.PropTypes.func,
  nextPage: React.PropTypes.func,
};

PageList.defaultProps = {
  view: {
    isAllHistory: false,
    isSearch: false,
    isTagSearch: false,
    searchQuery: null,
    tagSearchQuery: null,
  },
  pages: [],
  currentPage: 0,
  pageRanges: [],
  isLoading: false,
  error: '',
  deletePage: () => {},
  removeTag: () => {},
  addTag: () => {},
  previousPage: () => {},
  nextPage: () => {},
};

export default PageList;
