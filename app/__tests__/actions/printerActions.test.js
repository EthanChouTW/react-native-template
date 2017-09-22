import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setPrinterDetail, setSelectedPrinter, toggleAutoPrint } from '../../actions/printerActions';
import { SET_PRINTER_DETAIL, TOGGLE_AUTO_PRINT } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('printer actions', () => {
  const printer = {
    name: 'DP-TL900',
    address: 'F6:74:A1:F8:88:BA',
    isAutoPrint: false
  };
  it('should match action ', () => {
    const expectedAction = {
      type: SET_PRINTER_DETAIL,
      payload: printer
    };
    expect(setPrinterDetail(printer)).toEqual(expectedAction);
  });

  it('should dispatch right action', () => {
    const expectedActions = [
      {
        payload: printer,
        type: SET_PRINTER_DETAIL
      }
    ];

    const store = mockStore({});

    return store.dispatch(setSelectedPrinter(printer)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch change auto print status', () => {
    const expectedActions = [
      {
        type: TOGGLE_AUTO_PRINT
      }
    ];

    const store = mockStore({});

    return store.dispatch(toggleAutoPrint()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
