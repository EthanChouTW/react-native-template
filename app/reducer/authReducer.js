import { AUTH_USER, UNAUTH_USER, STORE_REHYDRATE } from '../actions/actionTypes';

const defaultState = {
  beeId: undefined,
  accessToken: undefined,
  firebaseEndpoint: undefined,
  firebaseCustomToken: undefined,
  user: undefined,
  isReduxStoreReady: false
};

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case STORE_REHYDRATE: {
      return {
        ...action.payload.auth,
        isReduxStoreReady: true
      };
    }
    case AUTH_USER:
      return {
        ...state,
        beeId: action.beeId,
        accessToken: action.accessToken,
        firebaseEndpoint: action.firebaseEndpoint,
        firebaseCustomToken: action.firebaseCustomToken,
        user: action.user
      };
    case UNAUTH_USER:
      return {
        ...defaultState,
        isReduxStoreReady: state.isReduxStoreReady
      };
    default:
      return state;
  }
};
