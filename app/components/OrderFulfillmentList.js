import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NativeEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import NavigationBar from './NavigationBar';
import Theme from '../utils/styleCollection';
import { DRAWER_OPEN } from '../utils/appConstants';
import Locales from '../locales';

// const HBOrderNotificationBroadcaster = NativeModules.HBOrderNotificationBroadcaster;
// const HBOrderNotificationEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(HBOrderNotificationBroadcaster) : DeviceEventEmitter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbGray
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class OrderFulfillmentList extends Component {
  static navigationOptions = {
    drawerLabel: Locales.t('partner_food_orders_title')
  };
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
    // this.props.startFirebase();
    // this.subscription = HBOrderNotificationEmitter.addListener('orderListener', orderNotificationInfo => {
    //   this.setState({
    //     orderNotificationInfo
    //   });
    //   this.onRefresh();
    // });
  }

  onMenuPress = () => {
    this.props.navigation.navigate(DRAWER_OPEN);
  };

  renderNavBar = () => {
    return <NavigationBar iconName={'menu'} onIconPress={this.onMenuPress} />;
  };

  render() {
    return <View style={styles.container}>{this.renderNavBar()}</View>;
  }
}
