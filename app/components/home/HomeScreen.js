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
import WalkScrenn from './WalkScreen';
import SleepScreen from './SleepScreen';
import EffectExerciseScreen from './EffectExerciseScreen';
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
  },
  userSection: {
    flex: 1,
    flexDirection: 'row'
  },
  userInfo: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    flex: 8,
    justifyContent: 'center'
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
  myPoint: {
    paddingTop: 20,
    paddingLeft: 24,
    backgroundColor: 'transparent',
    color: Theme.AMYellow,
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1
  },
  pointContainer: {
    flexDirection: 'row',
    flex: 2
  },
  point: {
    paddingLeft: 24,
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    flex: 4
  },
  checkPointDetail: {
    flex: 1
  },
  infoSection: {
    flex: 5
  },
  infoSectionContent: {
    height: 700
  },
  weightCheck: {
    height: 180,
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
    fontWeight: '700',
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
    backgroundColor: '#56BBB5'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
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
  collectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  collectionItem: {
    marginTop: 16,
    marginLeft: paddingValue * 2,
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
  collectionImage: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flex: 8
  },
  collectionTitle: {
    flex: 2,
    paddingTop: 4,
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  collectionDescription: {
    paddingTop: 4,
    paddingLeft: 8,
    flex: 1
  },
  cellContainer: {
  },
  cellItemContainer: {
    marginTop: paddingValue * 2,
    marginLeft: paddingValue * 2
  },
  cellTitle: {
    paddingTop: 8,
    paddingLeft: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: Theme.titleText
  },
  cellDate: {
    paddingTop: 8,
    paddingLeft: 8,
    fontSize: 14,
    color: Theme.grayText
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
      isShowWalkScreen: false,
      isShowSleepScreen: false,
      isShowEffectExerciseScreen: false
    };
  }

  toggleWalkScreen = () => {
    this.setState({
      isShowWalkScreen: !this.state.isShowWalkScreen
    });
  }

  toggleSleepScreen = () => {
    this.setState({
      isShowSleepScreen: !this.state.isShowSleepScreen
    });
  }

  toggleEffectExerciseScreen = () => {
    this.setState({
      isShowEffectExerciseScreen: !this.state.isShowEffectExerciseScreen
    });
  }

  onMenuPress = () => {
    this.props.navigation.navigate(DRAWER_OPEN);
  };

  renderNavBar = () => {
    return;
  };

  _calculateItemSize() {
    let { height, width } = Dimensions.get('window');
    return (width - paddingValue * 6) / 2;
  }

  _calculateCellSize() {
    let { height, width } = Dimensions.get('window');
    return width - paddingValue * 4;
  }

  render() {
    const { isShowWalkScreen, isShowSleepScreen, isShowEffectExerciseScreen } = this.state;
    const renderTitleIndicator = () => (
      <PagerTitleIndicator
        style={styles.viewPagerIndicator}
        itemTextStyle={styles.viewPagerTitle}
        selectedItemTextStyle={styles.selectedViewPagerTitle}
        selectedBorderStyle={styles.viewPagerBorder}
        titles={['每日運動', '活動專頁']}
      />
    );
    const collectionSize = this._calculateItemSize();
    const cellSize = this._calculateCellSize();
    const modalAnimationTypeSlide = 'slide';
    const modalAnimationTypeFade = 'fade';
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
                <View style={styles.avatarImage} />
              </View>
              <Text style={styles.name}>EthanChou</Text>
            </View>
            <LinearGradient
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 2.0, y: 1.0 }}
              locations={[0, 0.5, 0.6]}
              colors={['#0DC0B0', '#47D37F', '#78E355']}
              style={styles.userPointInfo}
            >
              <TouchableOpacity style={{ flex: 1 }}>
                <Text style={styles.myPoint}>我的點數</Text>
                <View style={styles.pointContainer}>
                  <Text style={styles.point}>9,966</Text>
                  <View style={styles.checkPointDetail}>
                    <Image
                      source={require('../../../assets/image/icon_forward.png')}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.infoSection}>
          <ScrollView contentContainerStyle={{ height: collectionSize * 6 }}>
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
              <TouchableOpacity style={styles.weightButton}>
                <Text style={styles.buttonTitle}>更新體重</Text>
              </TouchableOpacity>
            </View>
            <IndicatorViewPager
              style={styles.viewPager}
              indicator={renderTitleIndicator()}
            >
              <View
                style={[
                  styles.collectionContainer,
                  { height: collectionSize * 5 }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.collectionItem,
                    { width: collectionSize, height: collectionSize * 1.5 }
                  ]}
                  onPress={this.toggleEffectExerciseScreen}
                >
                  <Image
                    style={[{ width: collectionSize }, styles.collectionImage]}
                    source={require('../../../assets/image/bg_card_blue.png')}
                  />
                  <Text style={styles.collectionDescription}>最高可獲得50點</Text>
                  <Text style={styles.collectionTitle}>有效運動</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.collectionItem,
                    { width: collectionSize, height: collectionSize * 1.5 }
                  ]}
                  onPress={this.toggleWalkScreen}
                >
                  <Image
                    style={[{ width: collectionSize }, styles.collectionImage]}
                    source={require('../../../assets/image/bg_card_orange.png')}
                  />
                  <Text style={styles.collectionDescription}>最高可獲得40點</Text>
                  <Text style={styles.collectionTitle}>走路運動</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.collectionItem,
                    { width: collectionSize, height: collectionSize * 1.5 }
                  ]}
                  onPress={this.toggleSleepScreen}
                >
                  <Image
                    style={[{ width: collectionSize }, styles.collectionImage]}
                    source={require('../../../assets/image/bg_card_purple.png')}
                  />
                  <Text style={styles.collectionDescription}>最高可獲得30點</Text>
                  <Text style={styles.collectionTitle}>睡眠</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cellContainer}>
                <TouchableOpacity style={styles.cellItemContainer}>
                  <Image
                    style={[{ width: cellSize }, styles.cellImage]}
                    source={require('../../../assets/image/bg_promotion.png')}
                  />
                  <Text style={styles.cellTitle}>活動名稱</Text>
                  <Text style={styles.cellDate}>2017-08-31</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cellItemContainer}>
                  <Image
                    style={[{ width: cellSize }, styles.cellImage]}
                    source={require('../../../assets/image/bg_promotion.png')}
                  />
                  <Text style={styles.cellTitle}>活動名稱</Text>
                  <Text style={styles.cellDate}>2017-08-31</Text>
                </TouchableOpacity>
              </View>
            </IndicatorViewPager>
          </ScrollView>
        </View>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent
          visible={isShowWalkScreen}
          onRequestClose={this.toggleWalkScreen}
        >
          {isShowWalkScreen && (
            <WalkScrenn
              onDismissView={this.toggleWalkScreen}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent
          visible={isShowSleepScreen}
          onRequestClose={this.toggleSleepScreen}
        >
          {isShowSleepScreen && (
            <SleepScreen
              onDismissView={this.toggleSleepScreen}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent
          visible={isShowEffectExerciseScreen}
          onRequestClose={this.toggleEffectExerciseScreen}
        >
          {isShowEffectExerciseScreen && (
            <EffectExerciseScreen
              onDismissView={this.toggleEffectExerciseScreen}
            />
          )}
        </Modal>
      </View>
    );
  }
}
