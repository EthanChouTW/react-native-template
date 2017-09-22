import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import InventoryList from '../../components/inventoryManagement/InventoryList';

describe('UserProfileMenuComponent', () => {
  const props = {
    onRefresh: jest.fn(),
    refreshing: false,
    data: [
      {
        id: 123,
        title: 'enen',
        status: 'available',
        price: 3,
        currency: 'TWD'
      }
    ],
    onUpdateProductStatus: jest.fn(),
    onReachedEnd: jest.fn(),
    extraState: {},
    isChangingStatus: false,
    changingProductId: null
  };
  test('renders correctly', () => {
    const snapshot = renderer.create(<InventoryList {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  const propsIsChanging = {
    onRefresh: jest.fn(),
    refreshing: false,
    data: [
      {
        id: 123,
        title: 'enen',
        status: 'available',
        price: 3,
        currency: 'TWD'
      }
    ],
    onUpdateProductStatus: jest.fn(),
    onReachedEnd: jest.fn(),
    extraState: {},
    isChangingStatus: true,
    changingProductId: 123
  };
  test('renders correctly', () => {
    const snapshot = renderer.create(<InventoryList {...propsIsChanging} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
