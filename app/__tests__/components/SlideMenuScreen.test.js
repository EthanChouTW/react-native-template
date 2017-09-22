import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SlideMenuScreen from '../../components/SlideMenuScreen';

describe('UserProfileMenuComponent', () => {
  const routes = [
    {
      key: 'UserProfile',
      routeName: 'UserProfile'
    },
    {
      key: 'Home',
      routeName: 'Home'
    },
    {
      key: 'InventoryManagementScreen',
      routeName: 'InventoryManagementScreen'
    },
    {
      key: 'JobHistory',
      routeName: 'JobHistory'
    },
    {
      key: 'Logout',
      routeName: 'Logout'
    }
  ];
  const props = {
    renderIcon: jest.fn(),
    getLabel: jest.fn(),
    navigation: {
      state: {
        routes
      }
    },
    items: routes
  };
  test('renders correctly', () => {
    const snapshot = renderer.create(<SlideMenuScreen {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
