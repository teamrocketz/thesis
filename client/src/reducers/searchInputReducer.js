import utils from '../utils';

const initialState = {
  queryField: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_QUERY_FIELD':
      return utils.updateObject(state, { queryField: action.query });

    default:
      return state;
  }
}
