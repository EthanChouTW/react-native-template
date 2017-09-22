import reducer from '../../reducer/productReducer';
import {
  SET_PRODUCTS,
  SET_SELECTED_BRANCH,
  CHANGE_PRODUCT_STATUS,
  ADD_ALERT,
  SET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS
} from '../../actions/actionTypes';

describe('product reducer', () => {
  const initialState = { byId: {}, searchProductsById: {}, searchProductsIds: [] };
  it('should handle SET', () => {
    expect(
      reducer(initialState, {
        type: SET_PRODUCTS,
        payload: {
          byId: { 123: { id: 123 } }
        }
      })
    ).toEqual({ byId: { 123: { id: 123 } }, searchProductsById: {}, searchProductsIds: [] });
  });

  it('should clear products', () => {
    expect(
      reducer(
        { byId: 1 },
        {
          type: SET_SELECTED_BRANCH,
          payload: {}
        }
      )
    ).toEqual({
      byId: {},
      searchProductsIds: [],
      searchProductsById: {}
    });
  });

  it('should update product status', () => {
    expect(
      reducer(
        {
          byId: { 1: { id: 1, status: 'status_available' } },
          searchProductsById: { 1: { id: 1, status: 'status_available' } },
          searchProductsIds: [1]
        },
        {
          type: CHANGE_PRODUCT_STATUS,
          payload: {
            productId: 1,
            productStatus: 'status_out_of_stock'
          }
        }
      )
    ).toEqual({
      byId: { 1: { id: 1, status: 'status_out_of_stock' } },
      searchProductsById: { 1: { id: 1, status: 'status_out_of_stock' } },
      searchProductsIds: [1]
    });
  });

  it('should set search products', () => {
    expect(
      reducer(
        {
          byId: { 1: { id: 1, status: 'status_available' } },
          searchProductsById: {},
          searchProductsIds: []
        },
        {
          type: SET_SEARCH_PRODUCTS,
          payload: {
            byId: { 123: { id: 123 } },
            Ids: [123]
          }
        }
      )
    ).toEqual({
      byId: { 1: { id: 1, status: 'status_available' } },
      searchProductsById: { 123: { id: 123 } },
      searchProductsIds: [123]
    });
  });
  it('should clear search products', () => {
    expect(
      reducer(
        {
          byId: { 1: { id: 1, status: 'status_available' } },
          searchProductsById: { 123: { id: 123 } },
          searchProductsIds: [123]
        },
        {
          type: CLEAR_SEARCH_PRODUCTS
        }
      )
    ).toEqual({
      byId: { 1: { id: 1, status: 'status_available' } },
      searchProductsById: {},
      searchProductsIds: []
    });
  });
  it('should return current state', () => {
    expect(
      reducer(initialState, {
        type: ADD_ALERT
      })
    ).toEqual(initialState);
  });
});
