import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './authReducer';
import alerts from './alertReducer';
import orderFulfillments from './orderFulfillmentsReducer';
import jobHistory from './jobHistoryReducer';
import branches from './branchesReducer';
import store from './storeReducer';
import fulfillments from './fulfillmentsReducer';
import departments from './departmentReducer';
import categories from './categoryReducer';
import products from './productReducer';
import printer from './printerReducer';
import nav from './navReducer';

module.exports = combineReducers({
  form,
  auth,
  alerts,
  orderFulfillments,
  jobHistory,
  branches,
  store,
  fulfillments,
  departments,
  categories,
  products,
  printer,
  nav
});
