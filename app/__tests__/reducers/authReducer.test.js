import { AUTH_USER, UNAUTH_USER, STORE_REHYDRATE } from '../../actions/actionTypes';
import reducer from '../../reducer/authReducer';

describe('Authentication reducers', () => {
  const defaultState = {
    beeId: undefined,
    accessToken: undefined,
    firebaseEndpoint: undefined,
    firebaseCustomToken: undefined,
    isReduxStoreReady: false,
    user: undefined
  };

  const endState = {
    beeId: 123,
    accessToken: 123,
    firebaseCustomToken: 123,
    firebaseEndpoint: 123,
    isReduxStoreReady: false,
    user: {
      id: 123123,
      email: 'ethan.chou@honestbee.com'
    }
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle AUTH_USER', () => {
    expect(
      reducer(defaultState, {
        type: AUTH_USER,
        ...endState
      })
    ).toEqual(endState);
  });

  it('should handle UNAUTH_USER', () => {
    expect(
      reducer(endState, {
        type: UNAUTH_USER
      })
    ).toEqual(defaultState);
  });

  it('should handle Store finished Rehydrate', () => {
    expect(
      reducer(defaultState, {
        type: STORE_REHYDRATE,
        payload: {
          auth: endState
        }
      })
    ).toEqual({
      ...endState,
      isReduxStoreReady: true
    });
  });
});
