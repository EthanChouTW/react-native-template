import uuid from 'uuid';
import { ADD_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERT } from '../actions/actionTypes';

const defaultState = [];

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, {
        text: action.text,
        id: uuid.v4()
      }];
    case REMOVE_ALERT:
      return state.filter((alert) => {
        if (alert.id === action.id) {
          return false;
        }
        return true;
      });
    case REMOVE_ALL_ALERT:
      return defaultState;
    default:
      return state;
  }
};
