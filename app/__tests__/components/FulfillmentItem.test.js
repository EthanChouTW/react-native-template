import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import FulfillmentItem from '../../components/FulfillmentItem';

describe('FulfillmentItem', () => {
  const item = { quantity: '1', itemTitle: 'title', amount: '100' };
  test('renders correctly', () => {
    const snapshot = renderer.create(<FulfillmentItem item={item} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
