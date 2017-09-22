import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import OrderFulfillmentItem from './OrderFulfillmentItem';
import Theme from '../utils/styleCollection';
import Locales from '../locales';

const styles = StyleSheet.create({
  emptyViewContainer: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  emptyViewTitle: {
    fontSize: 20,
    color: Theme.grayBackgroundColor,
    textAlign: 'center'
  },
  emptyViewBody: {
    fontSize: 16,
    color: Theme.grayBackgroundColor,
    textAlign: 'center',
    marginTop: 24
  },
  scrollView: {
    height: '100%'
  }
});

const EmptyView = () => (
  <View style={styles.emptyViewContainer}>
    <Text style={styles.emptyViewTitle}>{Locales.t('title_empty_job_list')}</Text>
    <Text style={styles.emptyViewBody}>{Locales.t('msg_empty_job_list')}</Text>
  </View>
);

const OrderFulfillmentPage = props => (
  <View>
    {props.orderFulfillments.length === 0 ? <EmptyView /> : null}
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      automaticallyAdjustContentInsets={false}
    >
      {props.orderFulfillments.map(orderFulfillment => (
        <OrderFulfillmentItem
          key={orderFulfillment.id}
          orderFulfillment={orderFulfillment}
          needRefresh={props.refreshAll}
          isPreparing={props.isPreparing}
        />
      ))}
    </ScrollView>
  </View>
);

OrderFulfillmentPage.propTypes = {
  orderFulfillments: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshAll: PropTypes.func.isRequired,
  isPreparing: PropTypes.bool.isRequired
};

export default OrderFulfillmentPage;
