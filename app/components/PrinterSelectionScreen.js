import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import Theme from '../utils/styleCollection';
import NavigationBar from './NavigationBar';
import { setSelectedPrinter } from '../actions/printerActions';
import Locales from '../locales';

const HBPrinter = NativeModules.HBPrinter;
const HBPeripheralBrocaster = NativeModules.HBPeripheralBrocaster;
const HBPeripheralEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(HBPeripheralBrocaster) : DeviceEventEmitter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  listContainer: {
    flex: 1,
    backgroundColor: Theme.whiteColor,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    height: 80,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: Theme.hbGray,
    borderBottomWidth: 1,
    margin: 5
  },
  titleText: {
    paddingTop: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  confirmButtonContainer: {
    borderWidth: 1,
    borderColor: Theme.grayBorderColor,
    padding: 15
  },
  confirmButton: {
    backgroundColor: Theme.algaeGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1
  },
  confirmButtonTitle: {
    color: Theme.whiteColor,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapDispatchToProps = {
  setSelectedPrinter
};

@connect(null, mapDispatchToProps)
export default class BranchesList extends Component {
  static propTypes = {
    setSelectedPrinter: PropTypes.func,
    onPressHideButton: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
    this.subscription = HBPeripheralEmitter.addListener('devicesListener', devices => {
      this.setState({
        devices
      });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  onScanDevices = () => {
    this.searchPrinter();
  };

  searchPrinter = () => {
    HBPrinter.handleSearch();
  };

  handleSelectPrinter = async (device) => {
    const { onPressHideButton } = this.props;
    await this.props.setSelectedPrinter(device);
    onPressHideButton();
  }

  renderItem = element => (
    <TouchableOpacity
      key={element.index}
      style={styles.card}
      onPress={() => this.handleSelectPrinter(element.item)}
    >
      <Text style={styles.titleText}>{element.item.name}</Text>
      <Text style={styles.titleText}>{element.item.address}</Text>
    </TouchableOpacity>
    );

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('search_printer')}
          onIconPress={this.props.onPressHideButton}
        />
        <FlatList
          removeClippedSubviews={false}
          data={this.state.devices}
          renderItem={this.renderItem}
          keyExtractor={device => this.state.devices.indexOf(device)}
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              this.onScanDevices();
            }}
          >
            <Text style={styles.confirmButtonTitle}>{Locales.t('lbl_scan')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
