import { SET_JOB_HISTORY, CLEAN_JOB_HISTORY } from '../actions/actionTypes';

const initialState = {
  byId: {},
  Ids: [],
  currentPage: 0,
  done: false
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOB_HISTORY: {
      const { byId, Ids, currentPage, done } = action.payload;
      return {
        ...state,
        byId: Object.assign({}, state.byId, byId),
        Ids: state.Ids.concat(Ids),
        currentPage,
        done
      };
    }
    case CLEAN_JOB_HISTORY: {
      return initialState;
    }
    default:
      return state;
  }
};
