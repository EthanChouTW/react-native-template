import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
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
import Theme from '../../utils/styleCollection';
import { DRAWER_OPEN } from '../../utils/appConstants';
import Locales from '../../locales';

// const HBOrderNotificationBroadcaster = NativeModules.HBOrderNotificationBroadcaster;
// const HBOrderNotificationEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(HBOrderNotificationBroadcaster) : DeviceEventEmitter;
const paddingValue = 8;

let { height, width } = Dimensions.get('window');

const actionButtonsHeight = 64;
const otherInfoHeight = height / 2 - actionButtonsHeight;
const otherInfoCircleOneHeight = otherInfoHeight / 2;
const otherInfoCircleOneWidth = width / 2;
const basicFontSize = width > 375 ? 36: 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.backgroundGreen
  },
  countDownScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  countDownText: {
    color: Theme.bannerGreen,
    fontSize: 200
  },
  heartSection: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  heartCenter: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Theme.whiteRiceColor
  },
  heartImage: {
    marginTop: 30,
    height: width * 0.5,
    width: width * 0.5,
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  heartInfoSection: {
    width: width * 0.7,
    height: width * 0.4,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  heartStrengthSection: {},
  calorieSection: {},
  otherInfo: {
    flex: 1,
    marginTop: -20
  },
  otherInfoCircleContainer: {
    height: otherInfoHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  otherInfoCircleOneContainer: {
    width: otherInfoCircleOneWidth - 1,
    height: otherInfoCircleOneHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherInfoCircle: {
    width: otherInfoCircleOneHeight - 10,
    height: otherInfoCircleOneHeight - 10,
    borderRadius: otherInfoCircleOneHeight / 2 - 5,
    backgroundColor: Theme.dartBlack,
    justifyContent: 'center'
  },
  dataInfoContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  valueText: {
    fontSize: basicFontSize,
    color: Theme.backgroundGreen
  },
  unitText: {
    fontSize: 14,
    color: Theme.backgroundGreen
  },
  titleText: {
    marginTop: 10,
    fontSize: 14
  },
  actionButtons: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row'
  },
  changeStateButton: {
    height: 64,
    flex: 1,
    backgroundColor: Theme.disabledGreen,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dismissButton: {
    flex: 1,
    backgroundColor: Theme.bannerGreen,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};
let interval = undefined;
@connect(mapStateToProps, mapDispatchToProps)
export default class EffectiveExerciseScreen extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      countDown: 5,
      isStop: false
    };
  }

  componentDidMount() {
    this.handleCountDown();
  }

  componentWillUnmount() {
    this.handleClearInterval();
  }

  handleCountDown = () => {
    let counter = 1;
    interval = setInterval(() => {
      counter--;
      this.setState({
        countDown: counter
      });
      // Display 'counter' wherever you want to display it.
      if (counter == 0) {
        this.handleClearInterval();
      }
    }, 1000);
  };

  handleClearInterval = () => {
    clearInterval(interval);
  };

  toggleStopExercise = () => {
    this.setState({
      isStop: !this.state.isStop
    })
  }

  getExerciseStateButtonTitle = () => {
    if (this.state.isStop) {
      return '繼續';
    }
    return '暫停';
  };

  render() {
    const { countDown, isStop } = this.state;

    renderActionButtons = () => {
      return (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.changeStateButton} onPress={this.toggleStopExercise}>
            <Text style={styles.buttonText}>
              {this.getExerciseStateButtonTitle()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={this.props.onDismissView}
          >
            <Text style={styles.buttonText}>結束</Text>
          </TouchableOpacity>
        </View>
      );
    };

    renderScreen = () => {
      if (this.state.countDown !== 0) {
        return (
          <View style={styles.countDownScreen}>
            <Text style={styles.countDownText}>{this.state.countDown}</Text>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <View style={styles.heartSection}>
            <View style={styles.heartCenter}>
              <Image
                style={styles.heartImage}
                source={require('../../../assets/image/icon_big_heart.png')}
              >
                {renderDataInfo('167', 'bpm', '心跳數', true)}
              </Image>
              <View style={styles.heartInfoSection}>
              {renderDataInfo('100', '%', '心跳強度', true)}
              {renderDataInfo('235', 'kcal', '卡路里', true)}
               
              </View>
            </View>
          </View>
          <View style={styles.otherInfo}>
            <View style={styles.otherInfoCircleContainer}>
              {renderOtherInfoCircle(`99:99`, 'min/km', '平均速度', false)}
              {renderOtherInfoCircle(`99:99`, 'min/km', '現在速度', false)}
              {renderOtherInfoCircle(`99:99`, 'km', '距離', false)}
              {renderOtherInfoCircle(`99:99`, 'time', '時間', false)}
            </View>
          </View>
          {renderActionButtons()}
        </View>
      );
    };

    renderOtherInfoCircle = (value, unit, title, isInHeart) => {
      return (
        <View style={styles.otherInfoCircleOneContainer}>
          <View style={styles.otherInfoCircle}>
            {renderDataInfo(value, unit, title, isInHeart)}
          </View>
        </View>
      );
    };

    renderDataInfo = (value, unit, title, isInHeart) => {
      const plusStyle = isInHeart ? Theme.dartBlack : 'white';
      return (
        <View style={styles.dataInfoContainer}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.unitText}>{unit}</Text>
          <Text style={[styles.titleText, { color: plusStyle }]}>{title}</Text>
        </View>
      );
    };
    return <View style={styles.container}>{renderScreen()}</View>;
  }
}
