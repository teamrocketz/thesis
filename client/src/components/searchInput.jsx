import React from 'react';
import { Link } from 'react-router-dom';
import TagListContainer from '../containers/tagListContainer';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.clearQueryField = this.clearQueryField.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleShowAllRequest = this.handleShowAllRequest.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
  }

  componentWillMount() {
    this.props.historyViewAndRequest();
  }

  clearQueryField() { this.props.setQueryField(''); }

  handleQueryChange(e) { this.props.setQueryField(e.target.value); }

  handleShowAllRequest() {
    this.clearQueryField();
    this.props.historyViewAndRequest();
  }

  handleSearchRequest(e) {
    e.preventDefault();
    if (this.props.queryField === '') {
      this.props.historyViewAndRequest();
    } else {
      this.props.searchViewAndRequest(this.props.queryField);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row span-9">
          <div className="col-sm-1 pull-right">
            <Link
              to="/settings"
              role="button"
              className="btn btn-link pull-right"
            >
            Manage Blocked Domains
            </Link>
          </div>
        </div>
        <div className="row span-9">
          <form
            className="col-md-8"
            role="search"
            onSubmit={this.handleSearchRequest}
          >
            <input
              type="text"
              name="query"
              value={this.props.queryField}
              onChange={this.handleQueryChange}
              className="form-control"
            />
          </form>
          <div className="col-sm-1">
            <button
              type="submit"
              className="btn btn-default"
              onClick={this.handleSearchRequest}
            >
              <span
                role="button"
                className="glyphicon glyphicon-search"
                aria-hidden="false"
              />
            </button>
          </div>
          <TagListContainer clearQueryField={this.clearQueryField} />
          <div className="row span-12">
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-link"
                onClick={this.handleShowAllRequest}
              >
              Show All
              </button>
            </div>
            <div className="col-sm-10" />
          </div>
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  queryField: React.PropTypes.string,
  historyViewAndRequest: React.PropTypes.func,
  searchViewAndRequest: React.PropTypes.func,
  setQueryField: React.PropTypes.func,
};

SearchInput.defaultProps = {
  queryField: '',
  historyViewAndRequest: () => {},
  searchViewAndRequest: () => {},
  setQueryField: () => {},
};

export default SearchInput;
