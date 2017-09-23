import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ListView,
  Dimensions,
  Image,
  ImageBackground,
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
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RkButton } from 'react-native-ui-kitten';
import { PagerTabIndicator } from 'rn-viewpager';
import DeviceConnectScreen from '../alerts/DeviceConnectScreen';
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
  rightButtonText: {
    color: 'white'
  },
  pointContaner: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1,
    shadowRadius: 4
  },
  pointTitle: {
    color: Theme.titleText,
    fontSize: 18,
    paddingLeft: 16
  },
  pointSectionContaner: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  pointNumber: {
    color: Theme.pointGreen,
    fontSize: 36,
    fontWeight: 'bold'
  },
  pointUnit: {
    color: Theme.titleText,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 16,
    fontSize: 16
  },
  viewPager: {
    flex: 8,
    flexDirection: 'column-reverse'
  },
  viewPagerIndicator: {
    height: 48,
    backgroundColor: 'white'
  },
  viewPagerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Theme.grayText
  },
  selectedViewPagerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Theme.headerGreen
  },
  viewPagerBorder: {
    height: 3,
    backgroundColor: Theme.headerGreen
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40
  },
  dayDescription: {
    marginTop: 8,
    color: Theme.grayText,
    fontSize: 18
  },
  addButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 30,
    bottom: 30,
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 1
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 1
  },
  dayEffectiveExerciseTable: {
    alignItems: 'center'
  },
  row: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64
  },
  rowTitle: {
    color: Theme.titleText,
    fontSize: 16
  },
  rowSubtitle: {
    color: Theme.titleText,
    fontSize: 16
  },
  bottomLine: {
    height: 1,
    backgroundColor: Theme.grayText,
    width: '80%'
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class EffectiveExerciseScreen extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isShowConnectScreen: false,
      isConnectDevice: false,
      isFinishExercise: false,
      date: '2017-08-26',
      totalEffectiveExerciseTime: 5678,
      totalCal: 100,
      totalPoint: 30
    };
  }

  onMenuPress = () => {
    this.props.navigation.navigate(DRAWER_OPEN);
  };

  renderNavBar = () => {
    return;
  };

  onUploadEffectiveExerciseData = () => {

  }

  toggleConnectScreen = () => {
    this.setState({
      isShowConnectScreen: !this.state.isShowConnectScreen
    });
  };

  render() {
    const { isShowConnectScreen, isConnectDevice, isFinishExercise } = this.state;
    const renderTitleIndicator = () => (
      <PagerTitleIndicator
        style={styles.viewPagerIndicator}
        itemTextStyle={styles.viewPagerTitle}
        selectedItemTextStyle={styles.selectedViewPagerTitle}
        selectedBorderStyle={styles.viewPagerBorder}
        titles={['日', '週']}
      />
    );
    const renderDayEffectiveExerciseView = () => {
      if (isFinishExercise) {
        const { date, totalEffectiveExerciseTime, totalCal, totalPoint } = this.state;
        return (
          <View style={styles.dayEffectiveExerciseTable}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>運動日期</Text>
              <Text style={styles.rowSubtitle}>{date}</Text>
            </View>
            <View style={styles.bottomLine} />
            <View style={styles.row}>
              <Text style={styles.rowTitle}>本次完成</Text>
              <Text style={styles.rowSubtitle}>{`${totalEffectiveExerciseTime} 分鐘`}</Text>
            </View>
            <View style={styles.bottomLine} />
            <View style={styles.row}>
              <Text style={styles.rowTitle}>本次卡路里</Text>
              <Text style={styles.rowSubtitle}>{`${totalCal} cal`}</Text>
            </View>
            <View style={styles.bottomLine} />
            <View style={styles.row}>
              <Text style={styles.rowTitle}>本次點數</Text>
              <Text style={styles.rowSubtitle}>{`${totalPoint} 點`}</Text>
            </View>
            <View style={styles.bottomLine} />
            {renderBottomButton()}
          </View>
        );
      }
      return (
        <View style={styles.dayContainer}>
          <Text style={styles.dayDescription}>請點擊下方加號新增有效運動</Text>
          <Text style={styles.dayDescription}>開始運動吧！</Text>
          {renderBottomButton()}
        </View>
      );
    };

    renderBottomButton = () => {
      if (isFinishExercise) {
        return (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={this.onUploadEffectiveExerciseData}
          >
            <Image
              style={{ justifyContent: 'center', alignItems: 'center' }}
              source={require('../../../assets/image/btn_upload.png')}
            >
              <Text
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: 18
                }}
              >
                上傳昨日累積步數
              </Text>
            </Image>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.toggleConnectScreen}
        >
          <Image source={require('../../../assets/image/btn_add_round.png')} />
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          iconName={'ios-arrow-back'}
          title={'有效運動'}
          onIconPress={this.props.onDismissView}
        >
          <TouchableOpacity>
            <Text style={styles.rightButtonText}>歷史紀錄</Text>
          </TouchableOpacity>
        </NavigationBar>
        <View style={styles.pointContaner}>
          <Text style={styles.pointTitle}>累積至昨日點數</Text>
          <View style={styles.pointSectionContaner}>
            <Text style={styles.pointNumber}>9,980</Text>
            <Text style={styles.pointUnit}>點</Text>
          </View>
        </View>
        <IndicatorViewPager
          style={styles.viewPager}
          indicator={renderTitleIndicator()}
        >
          {renderDayEffectiveExerciseView()}
          <View style={styles.weekContainer}>
            <Text>長條圖</Text>
          </View>
        </IndicatorViewPager>

        <Modal
          animationType={'fade'}
          transparent
          visible={isShowConnectScreen}
          onRequestClose={this.toggleConnectScreen}
        >
          {isShowConnectScreen && (
            <DeviceConnectScreen
              onDismissView={this.toggleConnectScreen}
              title={'設備連結中...'}
            />
          )}
        </Modal>
      </View>
    );
  }
}
