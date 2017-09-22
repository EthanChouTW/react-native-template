import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Text,
  ScrollView,
  NativeModules,
  findNodeHandle,
  View,
  StyleSheet,
  WebView,
  TouchableOpacity
} from 'react-native';
import Theme from '../utils/styleCollection';
import Locales from '../locales';
import { constructHtmlString, countHtmlHeight } from './receipt/ReceiptFormatter';
import { updatedFulfillment, PRINTER_STATUS } from '../actions/fulfillmentsActions';

const HBPrinter = NativeModules.HBPrinter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbTransparentBlack
  },
  dialogContainer: {
    marginHorizontal: 30,
    padding: 15,
    height: 150,
    borderRadius: 5,
    backgroundColor: Theme.whiteColor
  },
  description: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  descriptionText: {
    fontSize: 12,
    color: Theme.hbTextGray
  },
  title: {
    flex: 1.5,
    justifyContent: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButton: {
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'flex-end'
  },
  actionButtonText: {
    color: Theme.algaeGreenColor
  },

  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  webview: {
    width: 375
  }
});

const mapStateToProps = state => ({
  printer: state.printer
});

const mapDispatchToProps = {
  updatedFulfillment
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ReceiptScreen extends Component {
  static propTypes = {
    onPressPrinterSelection: PropTypes.func,
    updatedFulfillment: PropTypes.func,
    orderFulfillment: PropTypes.shape({
      id: PropTypes.number,
      order: PropTypes.shape({
        orderNumber: PropTypes.number,
        user: PropTypes.shape({
          name: PropTypes.string,
          mobileNumber: PropTypes.string
        })
      }),
      pickupTime: PropTypes.string
    }),
    fulfillment: PropTypes.shape({
      printerStatus: PropTypes.string
    }),
    onDismissView: PropTypes.func,
    printer: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.searchPrinter();
    this.state = {
      isShowingAlert: false
    };
  }

  onRef = ref => {
    this.root = ref;
  };

  getHtml = (fulfillment, orderFulfillment) => constructHtmlString(fulfillment, orderFulfillment);

  getHtmlHeight = fulfillment => countHtmlHeight(fulfillment);

  searchPrinter = () => {
    HBPrinter.handleSearch();
  };

  makeImageAndPrint = async () => {
    try {
      const result = await this.captureRef(this.root);
      console.log('print status', result);
      this.updateFulfillment(PRINTER_STATUS.PRINTED);
      this.props.onDismissView();
    } catch (error) {
      console.log(error);
      this.setState({
        isShowingAlert: true
      });
    }
  };

  captureRef = view => {
    let captureView = view;
    if (typeof view !== 'number') {
      const node = findNodeHandle(view);
      if (!node) {
        return Promise.reject(new Error(`findNodeHandle failed to resolve view=${String(view)}`));
      }
      captureView = node;
    }
    return HBPrinter.captureRef(captureView, this.props.printer.address);
  };

  updateFulfillment = printerStatus => {
    const { orderFulfillment, fulfillment } = this.props;
    const newFulfillment = fulfillment;
    newFulfillment.printerStatus = printerStatus;
    this.props.updatedFulfillment(orderFulfillment.id, newFulfillment);
  };

  render() {
    const { fulfillment, orderFulfillment } = this.props;
    const htmlHeight = this.getHtmlHeight(fulfillment);

    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ width: '100%', height: htmlHeight }}
          style={{ position: 'absolute', left: 1000 }}
          ref={this.onRef}
        >
          <WebView
            style={[styles.webview, { height: htmlHeight }]}
            onLoadStart={() => {
              // TODO: currently webview in react native not serve api with static html endloading,
              // so we wait 2 second for load html, sad.
              setTimeout(() => {
                this.makeImageAndPrint();
              }, 2000);
            }}
            source={this.getHtml(fulfillment, orderFulfillment)}
            scrollEnabled={false}
          />
        </ScrollView>

        <View style={{ flex: 1 }} />
        {this.state.isShowingAlert ? (
          <View style={styles.dialogContainer}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{Locales.t('lbl_printer_error')}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{Locales.t('error_printing_failed')}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={this.props.onPressPrinterSelection}
              >
                <Text style={styles.actionButtonText}>
                  {Locales.t('go_to_printer_settings').toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={this.makeImageAndPrint}>
                <Text style={styles.actionButtonText}>{Locales.t('lbl_retry').toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ActivityIndicator
            animating
            color={Theme.algaeGreenColor}
            size="large"
            style={styles.activityIndicator}
          />
        )}
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
