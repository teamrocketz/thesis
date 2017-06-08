import React from 'react';

class TagSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
      pageId: this.props.pageId,
    };
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleTagRequest = this.handleTagRequest.bind(this);
  }

  handleTagInput(e) { this.setState({ tag: e.target.value }); }

  handleTagRequest(e) {
    e.preventDefault();
    this.props.addTag(this.state.tag, this.state.pageId);
  }

  render() {
    return (
      <div>
        <form
          className="navbar-form"
          role="search"
          onSubmit={this.handleTagRequest}
        >
          <input
            type="text"
            className="form-control"
            name="tag"
            value={this.state.tag}
            onChange={this.handleTagInput}
          />
          <div>
            <button type="submit" className="btn btn-primary">Add Tag</button>
          </div>
        </form>
      </div>
    );
  }
}

TagSearch.propTypes = {
  pageId: React.PropTypes.number,
  addTag: React.PropTypes.func,
};

TagSearch.defaultProps = {
  pageId: null,
  addTag: () => {},
};

export default TagSearch;
