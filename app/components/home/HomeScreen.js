import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { PagerTitleIndicator, IndicatorViewPager } from 'rn-viewpager';
import NavigationBar from '../NavigationBar';
import DrawerItemComponent from '../DrawerItemComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RkButton } from 'react-native-ui-kitten';
import { PagerTabIndicator } from 'rn-viewpager';
import Theme from '../../utils/styleCollection';
import { DRAWER_OPEN } from '../../utils/appConstants';
import Locales from '../../locales';

// const HBOrderNotificationBroadcaster = NativeModules.HBOrderNotificationBroadcaster;
// const HBOrderNotificationEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(HBOrderNotificationBroadcaster) : DeviceEventEmitter;
const paddingValue = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  statusBar: {
    paddingTop: 20
  },
  topBar: {
    height: 180,
    backgroundColor: Theme.headerGreen
  },
  menuButton: {
    padding: 16,
    paddingBottom: 0
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      drawerLabel: <DrawerItemComponent title={'首頁'} />
    };
  };
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  onMenuPress = () => {
    this.props.navigation.navigate(DRAWER_OPEN);
  };

  render() {
   
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.statusBar} />
          <TouchableOpacity
            style={styles.menuButton}
            onPress={this.onMenuPress}
          >
            <Icon name={'menu'} size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
