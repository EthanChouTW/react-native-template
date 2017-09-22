import { SET_STORE_DETAIL, SET_BUFFER_TIME, SET_STORE_OPEN_STATUS, CLEAR_STORE } from '../../actions/actionTypes';
import reducer from '../../reducer/storeReducer';

describe('Store reducer', () => {
  const defaultState = {
    id: undefined,
    name: '',
    bufferTime: 0,
    closed: false,
    temporarilyClosed: false,
    opensAt: null
  };

  const endState = {
    id: '123',
    name: 'name',
    bufferTime: 10,
    closed: false,
    temporarilyClosed: false,
    opensAt: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle SET_STORE_DETAIL', () => {
    expect(
      reducer(defaultState, {
        type: SET_STORE_DETAIL,
        store: {
          id: '123',
          name: 'name',
          bufferTime: 10,
          closed: false,
          temporarilyClosed: false,
          opensAt: null
        }
      })
    ).toEqual(
      endState
    );
  });

  it('should handle SET_BUFFER_TIME', () => {
    expect(
      reducer(endState, {
        type: SET_BUFFER_TIME,
        bufferTime: 20
      })
    ).toEqual({
      id: '123',
      name: 'name',
      bufferTime: 20,
      closed: false,
      temporarilyClosed: false,
      opensAt: null
    });
  });

  it('should handle SET_STORE_OPEN_STATUS when temporarily close store', () => {
    expect(
      reducer(endState, {
        type: SET_STORE_OPEN_STATUS,
        payload: {
          closed: true,
          temporarilyClosed: true,
          opensAt: '2017-09-12T09:38:26.306+08:00'
        }
      })
    ).toEqual({
      id: '123',
      name: 'name',
      bufferTime: 10,
      closed: true,
      temporarilyClosed: true,
      opensAt: '2017-09-12T09:38:26.306+08:00'
    });
  });

  it('should handle SET_STORE_OPEN_STATUS when open store', () => {
    const closedState = {
      id: '123',
      name: 'name',
      bufferTime: 10,
      closed: true,
      temporarilyClosed: true,
      opensAt: '2017-09-12T09:38:26.306+08:00'
    };

    expect(
      reducer(closedState, {
        type: SET_STORE_OPEN_STATUS,
        payload: {
          closed: false,
          temporarilyClosed: false,
          opensAt: null
        }
      })
    ).toEqual({
      id: '123',
      name: 'name',
      bufferTime: 10,
      closed: false,
      temporarilyClosed: false,
      opensAt: null
    });
  });

  it('should clear store', () => {
    expect(
      reducer(endState, {
        type: CLEAR_STORE
      })
    ).toEqual(
      defaultState
    );
  });
});
