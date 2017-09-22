import { SET_PRINTER_DETAIL, CLEAR_PRINTER, TOGGLE_AUTO_PRINT } from '../actions/actionTypes';

const initialState = {
  name: '',
  address: '',
  isAutoPrint: false
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRINTER_DETAIL:
      return action.payload;
    case CLEAR_PRINTER:
      return initialState;
    case TOGGLE_AUTO_PRINT:
      return {
        ...state,
        isAutoPrint: !state.isAutoPrint
      };
    default:
      return state;
  }
};
