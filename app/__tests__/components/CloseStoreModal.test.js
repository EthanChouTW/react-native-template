import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import CloseStoreModal from '../../components/storeStatus/CloseStoreModal';

describe('CloseStoreModal', () => {
  const props = {
    visible: true,
    onCancel: jest.fn(),
    onSave: jest.fn()
  };

  test('renders correctly', () => {
    const snapshot = renderer.create(<CloseStoreModal {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
