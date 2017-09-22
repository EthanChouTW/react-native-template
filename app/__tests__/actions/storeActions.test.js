import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setStoreDetail,
  setBufferTime,
  setStoreOpenStatus,
  clearStore,
  getStoreDetail,
  updateBufferTime,
  updateStoreOpenStatus
} from '../../actions/storeActions';
import {
  SET_STORE_DETAIL,
  SET_BUFFER_TIME,
  SET_STORE_OPEN_STATUS,
  CLEAR_STORE
} from '../../actions/actionTypes';
import { DurationTypes, StoreOpenStatus } from '../../utils/appConstants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('store actions', () => {
  it('should set store detail', () => {
    const store = {};
    const expectedAction = {
      type: SET_STORE_DETAIL,
      store
    };
    expect(setStoreDetail({})).toEqual(expectedAction);
  });

  it('should set buffer time', () => {
    const time = 55;
    const expectedAction = {
      type: SET_BUFFER_TIME,
      bufferTime: time
    };
    expect(setBufferTime(time)).toEqual(expectedAction);
  });

  it('should set store open status', () => {
    const closed = true;
    const temporarilyClosed = true;
    const opensAt = '2017-09-12T09:00:00.000+08:00';
    const expectedAction = {
      type: SET_STORE_OPEN_STATUS,
      payload: {
        closed,
        temporarilyClosed,
        opensAt
      }
    };
    expect(setStoreOpenStatus(closed, temporarilyClosed, opensAt)).toEqual(expectedAction);
  });

  it('should clear store', () => {
    const expectedAction = {
      type: CLEAR_STORE
    };
    expect(clearStore()).toEqual(expectedAction);
  });

  it('should create SET_STORE_DETAIL when get store detail', () => {
    const mockResponse = {};
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: SET_STORE_DETAIL,
        store: mockResponse
      }
    ];

    const store = mockStore({
      auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' },
      branches: { branchSelectedId: 111 }
    });
    return store.dispatch(getStoreDetail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should do nothing when no store ID', () => {
    const expectedActions = [];

    const store = mockStore({
      auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' },
      branches: { branchSelectedId: undefined }
    });
    return store.dispatch(getStoreDetail()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create SET_BUFFER_TIME when update store buffer time', () => {
    const bufferTime = 51;
    const mockResponse = {};
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: SET_BUFFER_TIME,
        bufferTime
      }
    ];

    const store = mockStore({
      auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' },
      branches: { branchSelectedId: 111 }
    });
    return store.dispatch(updateBufferTime(bufferTime)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create SET_STORE_OPEN_STATUS when temporarily close store', () => {
    const onError = jest.fn();
    const status = StoreOpenStatus.CLOSE;
    const durationType = DurationTypes.HOURS;
    const duration = 1;

    const mockResponse = {
      status: 'close',
      nextOpeningTime: '2017-09-12T09:38:26.306+08:00'
    };

    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: SET_STORE_OPEN_STATUS,
        payload: {
          closed: true,
          temporarilyClosed: true,
          opensAt: '2017-09-12T09:38:26.306+08:00'
        }
      }
    ];

    const store = mockStore({
      auth: { access_token: '' },
      branches: { branchSelectedId: 111 }
    });
    return store
      .dispatch(updateStoreOpenStatus(onError, status, durationType, duration))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create SET_STORE_OPEN_STATUS when open store', () => {
    const onError = jest.fn();
    const status = StoreOpenStatus.OPEN;
    const durationType = undefined;
    const duration = undefined;

    const mockResponse = {
      status: 'open',
      nextOpeningTime: null
    };

    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: SET_STORE_OPEN_STATUS,
        payload: {
          closed: false,
          temporarilyClosed: false,
          opensAt: null
        }
      }
    ];

    const store = mockStore({
      auth: { access_token: '' },
      branches: { branchSelectedId: 111 }
    });
    return store
      .dispatch(updateStoreOpenStatus(onError, status, durationType, duration))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
