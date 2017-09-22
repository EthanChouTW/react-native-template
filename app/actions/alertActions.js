import { ADD_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERT } from './actionTypes';

exports.addAlert = text => ({
  type: ADD_ALERT,
  text
});

exports.removeAlert = id => ({
  type: REMOVE_ALERT,
  id
});

exports.removeAllAlert = () => ({
  type: REMOVE_ALL_ALERT
});

