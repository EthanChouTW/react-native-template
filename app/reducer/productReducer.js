import {
  SET_PRODUCTS,
  SET_SELECTED_BRANCH,
  CHANGE_PRODUCT_STATUS,
  SET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS
} from '../actions/actionTypes';

const initialState = {
  byId: {},
  searchProductsById: {},
  searchProductsIds: []
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      const { byId } = action.payload;
      return {
        ...state,
        byId: Object.assign({}, state.byId, byId)
      };
    }
    case SET_SELECTED_BRANCH: {
      return initialState;
    }
    case CHANGE_PRODUCT_STATUS: {
      const { productId, productStatus } = action.payload;
      const { [`${productId}`]: originalProduct, ...rest } = state.byId;
      const updatedProduct = {
        ...originalProduct,
        status: productStatus
      };
      const { [`${productId}`]: originalSearchProduct, ...restSearchProducts } = state.searchProductsById;
      const updatedSearchProduct = {
        ...originalSearchProduct,
        status: productStatus
      };
      return {
        ...state,
        searchProductsById: { [`${productId}`]: updatedSearchProduct, ...restSearchProducts },
        byId: { [`${productId}`]: updatedProduct, ...rest }
      };
    }
    case SET_SEARCH_PRODUCTS: {
      const { byId, Ids } = action.payload;
      return {
        ...state,
        searchProductsById: byId,
        searchProductsIds: Ids
      };
    }
    case CLEAR_SEARCH_PRODUCTS: {
      return {
        ...state,
        searchProductsById: {},
        searchProductsIds: []
      };
    }
    default:
      return state;
  }
};
