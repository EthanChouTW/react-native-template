import { FULFILLMENT_CHANGED, UNLOAD_FULFILLMENT } from '../actions/actionTypes';

const initialState = {
  byId: {}
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case FULFILLMENT_CHANGED: {
      const fulfillment = action.payload;
      const byId = {
        ...state.byId,
        [fulfillment.id]: fulfillment
      };
      return {
        ...state,
        byId
      };
    }
    case UNLOAD_FULFILLMENT: {
      const { [action.payload]: deletedItem, ...rest } = state.byId;
      return {
        ...state,
        byId: rest
      };
    }
    default:
      return state;
  }
};
