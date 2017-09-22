import auth from './authActions';
import alert from './alertActions';
import orderFulfillment from './orderFulfillmentsActions';
import branch from './branchesActions';
import fulfillments from './fulfillmentsActions';
import store from './storeActions';
import printer from './printerActions';

module.exports = {
  ...auth,
  ...alert,
  ...orderFulfillment,
  ...branch,
  ...fulfillments,
  ...store,
  ...printer
};
