import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
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
import NavigationBar from './NavigationBar';
import DrawerItemComponent from './DrawerItemComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    backgroundColor: 'white'
  },
  statusBar: {
    paddingTop: 20
  },
  topBar: {
    flex: 1,
    backgroundColor: Theme.headerGreen
  },
  menuButton: {
    padding: 16,
    paddingBottom: 0
  },
  userSection: {
    flex: 1,
    flexDirection: 'row'
  },
  userInfo: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    flex: 8,
    justifyContent: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.hbGray
  },
  name: {
    flex: 2,
    color: 'white',
    fontSize: 14,
    fontWeight: '400'
  },
  userPointInfo: {
    flex: 6,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Theme.cardBackgroundColor
  },
  infoSection: {
    flex: 3
  },
  infoSectionContent: {
    height: 700
  },
  weightCheck: {
    flex: 3,
    backgroundColor: Theme.bannerGreen,
    margin: 16,
    borderRadius: 4,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1,
    shadowRadius: 4,
    alignItems: 'center'
  },
  weightText: {
    paddingVertical: 20,
    flex: 1,
    color: 'white',
    fontSize: 20
  },
  weightInput: {
    flex: 3,
    borderBottomWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: "700",
    paddingBottom: 10,
    width: 100
  },
  weightButton: {
    marginVertical: 20,
    height: 38,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    flex: 4,
    backgroundColor: '#56BBB5',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  viewpager: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 4,
    borderColor: Theme.bannerGreen
  },
  collection: {
    flex: 8,
    backgroundColor: 'white'
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
    return;
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
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <View style={styles.avatarImage}/> 
              </View>
              <Text style={styles.name}>EthanChou</Text>
            </View>
            <View style={styles.userPointInfo}></View>
          </View>
        </View>
        <View style={styles.infoSection}>
          <ScrollView contentContainerStyle={styles.infoSectionContent}>
            <View style={styles.weightCheck}>
              <Text style={styles.weightText}>今天量體重了嗎?</Text>
              <TextInput
                style={styles.weightInput}
                onChangeText={value => {
                  console.log(value);
                }}
                keyboardType={'decimal-pad'}
                maxLength={4}
                underlineColorAndroid="rgba(0,0,0,0)"
              />
              <TouchableOpacity
                style={styles.weightButton}
              >
                <Text style={styles.buttonTitle}>更新體重</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewpager} />
            <View style={styles.collection} />
          </ScrollView>
        </View>
      </View>
    );
  }
}
