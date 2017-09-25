import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './authReducer';
import alerts from './alertReducer';
import nav from './navReducer';

module.exports = combineReducers({
  form,
  auth,
  alerts,
  nav
});
