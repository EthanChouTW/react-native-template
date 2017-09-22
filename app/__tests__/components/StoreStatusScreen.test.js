import 'react-native';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import StoreStatusScreen from '../../components/storeStatus/StoreStatusScreen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('StoreStatusSreen', () => {
  const store = mockStore();

  const propsOpen = {
    pressHideButton: jest.fn(),
    closed: false,
    temporarilyClosed: false,
    opensAt: null,
    updateStoreOpenStatus: jest.fn()
  };

  const propsClose = {
    pressHideButton: jest.fn(),
    closed: true,
    temporarilyClosed: false,
    opensAt: '2017-09-12T11:17:16.498+08:00',
    updateStoreOpenStatus: jest.fn()
  };

  const propsTempClose = {
    pressHideButton: jest.fn(),
    closed: true,
    temporarilyClosed: true,
    opensAt: '2017-09-12T11:17:16.498+08:00',
    updateStoreOpenStatus: jest.fn()
  };

  test('renders correctly', () => {
    const snapshot = renderer.create(<StoreStatusScreen {...propsOpen} store={store} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const snapshot = renderer.create(<StoreStatusScreen {...propsClose} store={store} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const snapshot = renderer
      .create(<StoreStatusScreen {...propsTempClose} store={store} />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
