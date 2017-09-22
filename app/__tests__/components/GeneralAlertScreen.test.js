import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import GeneralAlertScreen from '../../components/alerts/GeneralAlertScreen';

describe('General alert', () => {
  const props = {
    onDismissView: jest.fn(),
    title: 'enen'
  };
  test('renders correctly', () => {
    const snapshot = renderer.create(<GeneralAlertScreen {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
