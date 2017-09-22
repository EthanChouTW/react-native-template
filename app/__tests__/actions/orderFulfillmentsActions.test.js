import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getOrderFulfillments,
  rejectOrderFulfillments,
  TAB_NEW,
  TAB_PREPARING
} from '../../actions/orderFulfillmentsActions';
import {
  SET_NEW_ORDER_FULFILLMENTS,
  SET_PREPARING_ORDER_FULFILLMENTS,
  UNLOAD_ORDER_FULFILLMENT,
  ADD_ALERT
} from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('order fulfillment actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('creates SET_NEW_ORDER_FULFILLMENTS when get order fulfillments done', () => {
    const mockOrderFulfillments = [];
    fetch.mockResponse(JSON.stringify(mockOrderFulfillments));

    const expectedActions = [
      {
        type: SET_NEW_ORDER_FULFILLMENTS,
        payload: { byId: {}, Ids: [] } // payload is normalized from array to object
      }
    ];

    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1 }
    });

    return store.dispatch(getOrderFulfillments(TAB_NEW, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_PREPARING_ORDER_FULFILLMENTS when get order fulfillments done', () => {
    const mockOrderFulfillments = [];
    fetch.mockResponse(JSON.stringify(mockOrderFulfillments));

    const expectedActions = [
      {
        type: SET_PREPARING_ORDER_FULFILLMENTS,
        payload: { byId: {}, Ids: [] } // payload is normalized from array to object
      }
    ];

    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1 }
    });

    return store.dispatch(getOrderFulfillments(TAB_PREPARING, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('show alert when get order fulfillments failed', () => {
    fetch.mockResponse(
      JSON.stringify({
        status: { code: 400, message: "couldn't get order fulfillments" }
      }),
      { status: 400 }
    );

    const text = "couldn't get order fulfillments";
    const expectedActions = [{ type: ADD_ALERT, text }];

    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1 }
    });

    return store.dispatch(getOrderFulfillments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('reject order', () => {
    const mockOrderFulfillment = { id: 1 };
    fetch.mockResponse(JSON.stringify(mockOrderFulfillment));
    const expectedActions = [
      {
        type: UNLOAD_ORDER_FULFILLMENT,
        payload: mockOrderFulfillment.id
      }
    ];

    const store = mockStore({
      auth: { accessToken: '' }
    });

    return store
      .dispatch(rejectOrderFulfillments(mockOrderFulfillment.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
