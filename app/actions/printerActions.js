import { SET_PRINTER_DETAIL, CLEAR_PRINTER, TOGGLE_AUTO_PRINT } from './actionTypes';

export const setPrinterDetail = printer => ({
  type: SET_PRINTER_DETAIL,
  payload: printer
});

export const clearPrinter = () => ({
  type: CLEAR_PRINTER
});

const toggleAutoPrintStatus = () => ({
  type: TOGGLE_AUTO_PRINT
});

export const setSelectedPrinter = printer => async (dispatch) => {
  dispatch(setPrinterDetail(printer));
};

export const toggleAutoPrint = () => async (dispatch) => {
  await dispatch(toggleAutoPrintStatus());
};
