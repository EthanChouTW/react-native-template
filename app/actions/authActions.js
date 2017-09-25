import * as Keychain from 'react-native-keychain';
import { NavigationActions } from 'react-navigation';
// import { loginUserApi, logoutUserApi } from '../api';
import { UNAUTH_USER, AUTH_USER, ADD_ALERT, REMOVE_ALL_ALERT } from './actionTypes';
import Locales from '../locales';

const authUser = (beeId, accessToken, firebaseEndpoint, firebaseCustomToken, user) => ({
  type: AUTH_USER,
  beeId,
  accessToken,
  firebaseEndpoint,
  firebaseCustomToken,
  user
});

const unAuthUser = () => ({ type: UNAUTH_USER });

const failToLogin = (text) => ({
  type: ADD_ALERT,
  text
});

const clearErrorMsg = () => ({
  type: REMOVE_ALL_ALERT
});

const isValidEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isValidPassword = (password) => password.length > 0;

export const loginUser = (email, password, platform) => async (dispatch) => {
  try {
    if (!isValidEmail(email)) {
      dispatch(failToLogin(Locales.t('msg_failed_to_login')));
      return;
    }
    if (!isValidPassword(password)) {
      dispatch(failToLogin(Locales.t('msg_failed_to_login')));
      return;
    }
    // const response = await loginUserApi(email, password);
    const access_token = 'access_token';
    const bee = { id: 'beeId' };
    const user = { id: 'userId' };
    const endpoint = 'endpoint';
    const auth = 'auth';
    const mockResponse = { access_token, user, bee, fulfillmentApi: { endpoint, auth } };
    // const { access_token, user, bee, fulfillmentApi: { auth, endpoint } } = mockResponse;
    
    if (platform === 'ios') {
      await Keychain.setGenericPassword(bee.id.toString());
    }
    await dispatch(authUser(
      bee.id.toString(),
      access_token,
      endpoint,
      auth,
      user
    ));
    // update Parse installation for push notification
    // Credentials saved successfully
    dispatch(NavigationActions.navigate({ routeName: 'Home' }));
    // await dispatch(setupFirebase());
    dispatch(clearErrorMsg());
  } catch (error) {
    dispatch(failToLogin(Locales.t('msg_failed_to_login')));
  }
};

export const handleExpiredUser = () => async (dispatch) => {
  dispatch(unAuthUser());

};

export const logoutUser = (accessToken) => async (dispatch) => {
  dispatch(unAuthUser());

};

// export const startFirebase = () => async (dispatch) => {
//   await dispatch(setupFirebase());
// };
