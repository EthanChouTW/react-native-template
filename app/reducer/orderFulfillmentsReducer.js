import {
  SET_NEW_ORDER_FULFILLMENTS,
  SET_PREPARING_ORDER_FULFILLMENTS,
  UNLOAD_ORDER_FULFILLMENT
} from '../actions/actionTypes';

const initialState = { byId: {}, newIds: [], preparingIds: [] };

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_ORDER_FULFILLMENTS: {
      const fulfillments = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...fulfillments.byId
        },
        newIds: fulfillments.Ids
      };
    }
    case SET_PREPARING_ORDER_FULFILLMENTS: {
      const fulfillments = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...fulfillments.byId
        },
        preparingIds: fulfillments.Ids
      };
    }
    case UNLOAD_ORDER_FULFILLMENT: {
      const { [`${action.payload}`]: deletedItem, ...rest } = state.byId;
      const nIds = state.newIds.filter(item => item !== action.payload);
      const pIds = state.preparingIds.filter(item => item !== action.payload);
      return {
        byId: rest,
        newIds: nIds,
        preparingIds: pIds
      };
    }
    default:
      return state;
  }
};
