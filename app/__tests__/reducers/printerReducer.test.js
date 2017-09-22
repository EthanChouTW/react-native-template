import { SET_PRINTER_DETAIL, CLEAR_PRINTER, TOGGLE_AUTO_PRINT } from '../../actions/actionTypes';
import reducer from '../../reducer/printerReducer';

describe('Store reducer', () => {
  const defaultState = {
    name: '',
    address: '',
    isAutoPrint: false
  };

  const endState = {
    name: 'DP-TL900',
    address: 'F6:74:A1:F8:88:BA',
    isAutoPrint: false
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle SET_PRINTER_DETAIL', () => {
    expect(
      reducer(defaultState, {
        type: SET_PRINTER_DETAIL,
        payload: endState
      })
    ).toEqual(endState);
  });

  it('should clear printer', () => {
    expect(
      reducer(endState, {
        type: CLEAR_PRINTER
      })
    ).toEqual(defaultState);
  });

  it('should toggle auto print', () => {
    const beforeToggleState = endState;
    const afterToggleState = { ...endState, isAutoPrint: !endState.isAutoPrint };
    expect(
      reducer(beforeToggleState, {
        type: TOGGLE_AUTO_PRINT
      })
    ).toEqual(afterToggleState);
  });
});
