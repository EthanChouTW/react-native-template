import {
  SET_CATEGORIES,
  APPEND_PRODUCTS_TO_CATEGORY,
  SET_SELECTED_BRANCH
} from '../actions/actionTypes';

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      const byId = action.payload.byId;
      const Ids = action.payload.Ids;
      return {
        ...state,
        byId,
        Ids
      };
    }
    case APPEND_PRODUCTS_TO_CATEGORY: {
      const { id, productIds, metaData } = action.payload;
      const { [`${id}`]: originalCategory, ...rest } = state.byId;
      const updatedCategory = {
        ...originalCategory,
        productIds,
        metaData
      };
      return {
        ...state,
        byId: { [`${id}`]: updatedCategory, ...rest }
      };
    }
    case SET_SELECTED_BRANCH: {
      return initialState;
    }
    default:
      return state;
  }
};
