import { fulfillmentChanged, unloadFulfillment } from '../../actions/fulfillmentsActions';
import { FULFILLMENT_CHANGED, UNLOAD_FULFILLMENT } from '../../actions/actionTypes';

describe('fulfillment actions', () => {
  it('should create an action to update fulfillment item', () => {
    const fulfillment = {};
    const expectedAction = {
      type: FULFILLMENT_CHANGED,
      payload: fulfillment
    };
    expect(fulfillmentChanged(fulfillment)).toEqual(expectedAction);
  });

  it('should create an action to unload fulfillment item', () => {
    const id = 1;
    const expectedAction = {
      type: UNLOAD_FULFILLMENT,
      payload: id
    };
    expect(unloadFulfillment(id)).toEqual(expectedAction);
  });
});
