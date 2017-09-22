import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import UserProfileMenuComponent from '../../components/UserProfile/UserProfileMenuComponent';

describe('UserProfileMenuComponent', () => {
  const props = {
    email: 'ethan.chou@honestbee.com',
    imageUrl: 'https://assets-staging.honestbee.com/avatars/default/default_avatar.png',
    name: 'Chou Ethan',
    isInSlideMenu: false
  };
  const propsWithIsInSlideMenuYES = {
    email: 'ethan.chou@honestbee.com',
    imageUrl: 'https://assets-staging.honestbee.com/avatars/default/default_avatar.png',
    name: 'Chou Ethan',
    isInSlideMenu: true
  };
  test('renders correctly', () => {
    const snapshot = renderer.create(<UserProfileMenuComponent {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  test('renders correctly', () => {
    const snapshot = renderer
      .create(<UserProfileMenuComponent {...propsWithIsInSlideMenuYES} />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
