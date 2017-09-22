import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AUTH_USER, UNAUTH_USER, CLEAR_STORE, CLEAR_BRANCH, CLEAR_PRINTER, ADD_ALERT } from '../../actions/actionTypes';
import { loginUser, handleExpiredUser, logoutUser } from '../../actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  it('creates AUTH_USER when login has been done', async () => {
    const access_token = 'access_token';
    const bee = { id: 'beeId' };
    const user = { id: 'userId' };
    const endpoint = 'endpoint';
    const auth = 'auth';
    const mockResponse = { access_token, user, bee, fulfillmentApi: { endpoint, auth } };
    const email = 'ethan.chou@honestbee.com';
    const password = 'xxxxxxx';
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: AUTH_USER,
        beeId: bee.id,
        accessToken: access_token,
        firebaseEndpoint: endpoint,
        firebaseCustomToken: auth,
        user
      },
      {
        routeName: 'Home',
        type: 'Navigation/NAVIGATE'
      },
      {
        text: 'msg_failed_to_login',
        type: ADD_ALERT
      }
    ];
    const store = mockStore({ auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' } });
    await store.dispatch(loginUser(email, password, 'test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_ALERT when email is invalid', async () => {
    const email = 'ethan';
    const password = 'xxxxxxx';
    const expectedActions = [
      {
        text: 'msg_failed_to_login',
        type: ADD_ALERT
      }
    ];
    const store = mockStore();
    await store.dispatch(loginUser(email, password, 'test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('creates UNAUTH_USER, CLEAR_STORE, and CLEAR_BRANCH when token expired', async () => {
    const expectedAction = [
      { type: UNAUTH_USER },
      { type: CLEAR_STORE },
      { type: CLEAR_BRANCH },
      { type: CLEAR_PRINTER }];
    const store = mockStore({ auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' } });
    await store.dispatch(handleExpiredUser()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('creates UNAUTH_USER, CLEAR_STORE, and CLEAR_BRANCH when logout', async () => {
    const expectedAction = [
      { type: UNAUTH_USER },
      { type: CLEAR_STORE },
      { type: CLEAR_BRANCH },
      { type: CLEAR_PRINTER }];
    const store = mockStore({ auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' } });
    await store.dispatch(logoutUser()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
})
;

