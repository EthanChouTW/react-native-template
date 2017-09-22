import reducer from '../../reducer/orderFulfillmentsReducer';
import {
  SET_NEW_ORDER_FULFILLMENTS,
  SET_PREPARING_ORDER_FULFILLMENTS,
  UNLOAD_ORDER_FULFILLMENT,
  ADD_ALERT
} from '../../actions/actionTypes';

describe('order fulfillments reducer', () => {
  const initialState = { byId: {}, newIds: [], preparingIds: [] };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  const myNewOrderFulfillments = [
    {
      id: 1,
      shopperStatus: 'status',
      totalAmount: '100'
    }
  ];

  let newById = {};
  myNewOrderFulfillments.forEach((orderFulfillment) => {
    newById = {
      ...newById,
      [orderFulfillment.id]: orderFulfillment
    };
  });
  const normalizedNewOrderFulfillments = { byId: newById, Ids: [1] };

  it('should handle empty SET_NEW_ORDER_FULFILLMENTS', () => {
    expect(
      reducer(initialState, {
        type: SET_NEW_ORDER_FULFILLMENTS,
        payload: { byId: {}, Ids: [] }
      })
    ).toEqual({
      byId: {}, newIds: [], preparingIds: []
    });
  });

  it('should handle empty SET_PREPARING_ORDER_FULFILLMENTS', () => {
    expect(
      reducer(initialState, {
        type: SET_PREPARING_ORDER_FULFILLMENTS,
        payload: { byId: {}, Ids: [] }
      })
    ).toEqual({
      byId: {}, newIds: [], preparingIds: []
    });
  });

  it('should handle SET_NEW_ORDER_FULFILLMENTS', () => {
    expect(
      reducer(initialState, {
        type: SET_NEW_ORDER_FULFILLMENTS,
        payload: normalizedNewOrderFulfillments
      })
    ).toEqual({ byId: normalizedNewOrderFulfillments.byId,
      newIds: normalizedNewOrderFulfillments.Ids,
      preparingIds: [] });
  });

  it('should handle SET_PREPARING_ORDER_FULFILLMENTS', () => {
    expect(
      reducer(initialState, {
        type: SET_PREPARING_ORDER_FULFILLMENTS,
        payload: normalizedNewOrderFulfillments
      })
    ).toEqual({ byId: normalizedNewOrderFulfillments.byId,
      newIds: [],
      preparingIds: normalizedNewOrderFulfillments.Ids });
  });

  it('should handle reject order', () => {
    expect(
      reducer({ byId: normalizedNewOrderFulfillments.byId,
        newIds: normalizedNewOrderFulfillments.Ids,
        preparingIds: [] }, {
          type: UNLOAD_ORDER_FULFILLMENT,
          payload: 1
        })
    ).toEqual({ byId: {}, newIds: [], preparingIds: [] });
  });

  it('should return current state', () => {
    expect(
      reducer(initialState, {
        type: ADD_ALERT
      })
    ).toEqual(initialState);
  });
});
