import reducer from '../../reducer/fulfillmentsReducer';
import { FULFILLMENT_CHANGED, UNLOAD_FULFILLMENT } from '../../actions/actionTypes';

describe('fulfillments reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ byId: {} });
  });

  const myFulfillment = {
    id: 100,
    items: {
      'item-123': { id: 'item-123', quantity: '1' },
      'item-456': { id: 'item-456', quantity: '2' },
      'item-789': { id: 'item-789', quantity: '3' }
    }
  };

  const myFulfillment2 = {
    id: 200,
    items: {
      'item-1': { id: 'item-1', quantity: '5' },
      'item-4': { id: 'item-4', quantity: '5' },
      'item-7': { id: 'item-7', quantity: '5' }
    }
  };

  it('should handle FULFILLMENT_CHANGED', () => {
    expect(
      reducer({}, {
        type: FULFILLMENT_CHANGED,
        payload: myFulfillment
      }))
      .toEqual({
        byId: {
          100: myFulfillment
        }
      });
  });

  it('should handle UNLOAD_FULFILLMENT', () => {
    expect(
      reducer({
        byId: {
          100: myFulfillment,
          200: myFulfillment2
        }
      },
        {
          type: UNLOAD_FULFILLMENT,
          payload: '100'
        }))
      .toEqual({
        byId: {
          200: myFulfillment2
        }
      });
  });
});
