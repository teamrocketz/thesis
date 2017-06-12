import React from 'react';

class TagGenerator extends React.Component {
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
    if (this.state.tag.length > 0) {
      this.props.addTag(this.state.tag, this.state.pageId);
      this.setState({ tag: '' });
    }
  }

  render() {
    return (
      <div>
        <form
          role="search"
          onSubmit={this.handleTagRequest}
          className="col-sm-8 pull-right"
        >
          <input
            type="text"
            name="tag"
            value={this.state.tag}
            onChange={this.handleTagInput}
            className="form-control-tags pull-right"
          />
          <div>
            <button type="submit" className="btn btn-xs btn-link pull-right">Add Tag</button>
          </div>
        </form>
      </div>
    );
  }
}

TagGenerator.propTypes = {
  pageId: React.PropTypes.number,
  addTag: React.PropTypes.func,
};

TagGenerator.defaultProps = {
  pageId: null,
  addTag: () => {},
};

export default TagGenerator;
