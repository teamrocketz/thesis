import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestHistory, getTags, tagSearch } from '../actions/index';
import tagList from '../components/tagList';

export const formatTags = (tags) => { // eslint-disable-line
  return tags.map((tag) => { // eslint-disable-line
    return { value: tag.id, label: tag.name };
  });
};

function mapStateToProps(state) {
  return {
    tags: state.pageList.tags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestHistory, getTags, tagSearch }, dispatch);
}

const tagListContainer = connect(mapStateToProps, mapDispatchToProps)(tagList);

export default tagListContainer;
