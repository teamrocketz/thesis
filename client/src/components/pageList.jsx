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

    let listHeader = '';
    const isLastPage = (this.props.currentPage === this.props.lastPage);
    const lastPageNote = isLastPage ? '(Last page)' : '';
    if (this.props.view.isAllHistory) {
      listHeader = `All browsing history: Page ${this.props.currentPage} ${lastPageNote}`;
    } else if (this.props.view.isSearch) {
      listHeader = `Search results for "${this.props.view.searchQuery}": Page ${this.props.currentPage} ${lastPageNote}`;
    } else if (this.props.view.isTagSearch) {
      listHeader = `Entries tagged "${this.props.view.tagSearchQuery}": Page ${this.props.currentPage} ${lastPageNote}`;
    }

    const renderPreviousButton = () => (
      <button
        className="btn btn-link pull-left"
        onClick={this.handleClickPreviousPage}
      >
        Previous Page
      </button>
    );

    const renderNextButton = () => (
      <button
        className="btn btn-link pull-right"
        onClick={this.handleClickNextPage}
      >
        Next Page
      </button>
    );

    // if top == true, render buttons for top of list
    // otherwise render buttons for bottom of list
    const renderButtons = (bottom) => {
      const divClasses = `clearfix ${bottom ? 'bottomPaginationButtons' : ''}`;

      return (
        <div className={divClasses}>
          {(this.props.currentPage > 1) ? renderPreviousButton() : []}
          {isLastPage ? [] : renderNextButton()}
        </div>
      );
    };

    const renderList = () => (
      <div className="clearfix">
        <h3>{listHeader}</h3>
        {renderButtons(false)}
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
          { this.props.pages.slice(
              this.props.pageRanges[this.props.currentPage - 1].startIndex,
              this.props.pageRanges[this.props.currentPage - 1].endIndex + 1,
          ).map(page => (
            <PageListItem
              key={page.id}
              page={page}
              addTag={this.props.addTag}
              removeTag={this.props.removeTag}
              deletePage={this.props.deletePage}
            />
          )) }
        </table>
        {renderButtons(true)}
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
  lastPage: React.PropTypes.number,
  pageRanges: React.PropTypes.arrayOf(React.PropTypes.shape({
    startIndex: React.PropTypes.number,
    endIndex: React.PropTypes.number,
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
  lastPage: -1,
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
