import {
  SET_DEPAERTMENTS,
  SET_SELECTED_BRANCH,
  APPEND_PRODUCTS_TO_DEPARTMENT
} from '../actions/actionTypes';

const initialState = {};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEPAERTMENTS: {
      return action.payload;
    }
    case APPEND_PRODUCTS_TO_DEPARTMENT: {
      const { id, productIds, metaData } = action.payload;
      const { [`${id}`]: originalDeparment, ...rest } = state.byId;
      const updatedDepartment = {
        ...originalDeparment,
        productIds: originalDeparment.productIds
          ? [...originalDeparment.productIds, ...productIds]
          : productIds,
        metaData
      };
      return {
        ...state,
        byId: { [`${id}`]: updatedDepartment, ...rest }
      };
    }
    case SET_SELECTED_BRANCH:
      return initialState;
    default:
      return state;
  }
};
