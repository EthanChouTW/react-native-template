import reducer from '../../reducer/departmentReducer';
import { APPEND_PRODUCTS_TO_DEPARTMENT, SET_DEPAERTMENTS, SET_SELECTED_BRANCH, ADD_ALERT } from '../../actions/actionTypes';

describe('department reducer', () => {
  const initialState = {};
  it('should handle SET_DEPAERTMENTS', () => {
    expect(
      reducer(initialState, {
        type: SET_DEPAERTMENTS,
        payload: { byId: { id: { id: 123 } } }
      })
    ).toEqual(
      { byId: { id: { id: 123 } } }
      );
  });

  it('should APPEND_PRODUCTS_TO_DEPARTMENT when query product vis department', () => {
    const departmentId = 100;
    expect(
      reducer({ byId: { 100: { productIds: [78] } } }, {
        type: APPEND_PRODUCTS_TO_DEPARTMENT,
        payload: { id: departmentId, productIds: [1, 2, 3, 4, 5], metaData: {} }
      })
    ).toEqual({
      byId: { 100: { metaData: {}, productIds: [78, 1, 2, 3, 4, 5] } }
    });
  });

  it('should clear department when user select branch', () => {
    expect(
      reducer({ byId: 1 }, {
        type: SET_SELECTED_BRANCH,
        payload: {}
      })
    ).toEqual({
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
