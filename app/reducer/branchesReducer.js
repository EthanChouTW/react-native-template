import { SET_BRANCHES, SET_SELECTED_BRANCH, CLEAR_BRANCH } from '../actions/actionTypes';

const initialState = {
  byId: {},
  Ids: [],
  branchSelectedId: undefined,
  branchSelectedName: undefined
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_BRANCHES:
      return {
        byId: action.byId,
        Ids: action.Ids,
        branchSelectedId: state.branchSelectedId,
        branchSelectedName: state.branchSelectedName
      };
    case SET_SELECTED_BRANCH:
      return {
        ...state,
        branchSelectedId: action.branchSelectedId,
        branchSelectedName: action.branchSelectedName
      };
    case CLEAR_BRANCH:
      return initialState;
    default:
      return state;
  }
};
