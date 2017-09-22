import reducer from '../../reducer/categoryReducer';
import {
  SET_CATEGORIES,
  APPEND_PRODUCTS_TO_CATEGORY,
  SET_SELECTED_BRANCH,
  ADD_ALERT
} from '../../actions/actionTypes';

describe('category reducer', () => {
  const initialState = {};
  it('should handle SET', () => {
    expect(
      reducer(initialState, {
        type: SET_CATEGORIES,
        payload: {
          byId: { 123: { id: 123, products: [], metaData: {} } },
          Ids: []
        }
      })
    ).toEqual({
      byId: { 123: { id: 123, products: [], metaData: {} } },
      Ids: []
    });
  });

  it('should clear category', () => {
    expect(
      reducer(
        { byId: 1 },
        {
          type: SET_SELECTED_BRANCH,
          payload: {}
        }
      )
    ).toEqual({});
  });

  it('should append products in category', () => {
    expect(
      reducer(
        { byId: { 1: { productIds: [] } } },
        {
          type: APPEND_PRODUCTS_TO_CATEGORY,
          payload: { id: 1, productIds: [1, 2, 3], metaData: {} }
        }
      )
    ).toEqual({
      byId: {
        1: {
          metaData: {},
          productIds: [1, 2, 3]
        }
      }
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
