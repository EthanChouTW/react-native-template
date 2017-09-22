import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BagIcon from 'react-native-vector-icons/Entypo';
import FulfillmentItem from './FulfillmentItem';
import RejectReasonScreen from './RejectReasonScreen';
import ContactInfoScreen from './ContactInfoScreen';
import FulfillmentEditScreen from './FulfillmentEditScreen';
import BagsEditScreen from './BagsEditScreen';
import ReceiptScreen from './ReceiptScreen';
import PrinterSelectionScreen from './PrinterSelectionScreen';
import PrinterSettingScreen from './PrinterSettingScreen';
import {
  listenFulfillment,
  updatedFulfillment,
  FULFILLMENT_STATUS,
  PRINTER_STATUS
} from '../actions/fulfillmentsActions';
import {
  acceptOrderFulfillments,
  rejectOrderFulfillments,
  startOrderFulfillments
} from '../actions/orderFulfillmentsActions';
import Theme from '../utils/styleCollection';
import Locales, { currencyPrice } from '../locales';
import { getDateMonth, getTime } from '../utils/dateFormatter';

const styles = StyleSheet.create({
  orderContainer: {
    paddingBottom: 16,
    backgroundColor: Theme.hbGray,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  firstCellContainer: {
    padding: 16,
    borderColor: Theme.hbGray,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderNumberContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  pickupTimeContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  customerInfoContainer: {
    padding: 16,
    borderBottomWidth: 2,
    borderTopWidth: 1,
    borderColor: Theme.hbGray,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  orderItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconTitleEditRowContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Theme.hbGray,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconTitle: {
    flex: 1,
    fontSize: 16
  },
  rightTextInRow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.algaeGreenColor
  },
  actionButtonContainer: {
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  actionButton: {
    borderColor: Theme.hbGray,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
    alignItems: 'center'
  },
  titleText: {
    color: Theme.darkerGray
  },
  contentText: {
    color: 'black'
  },
  rejectText: {
    color: Theme.hbRed
  },
  acceptText: {
    color: Theme.algaeGreenColor
  },
  whiteText: {
    color: 'white'
  },
  row: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    flex: 1
  },
  activityIndicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  fulfillments: state.fulfillments,
  branches: state.branches,
  printer: state.printer
});

const mapDispatchToProps = {
  listenFulfillment,
  updatedFulfillment,
  acceptOrderFulfillments,
  rejectOrderFulfillments,
  startOrderFulfillments
};

@connect(mapStateToProps, mapDispatchToProps)
export default class OrderFulfillmentItem extends Component {
  static propTypes = {
    listenFulfillment: PropTypes.func,
    updatedFulfillment: PropTypes.func,
    acceptOrderFulfillments: PropTypes.func,
    rejectOrderFulfillments: PropTypes.func,
    startOrderFulfillments: PropTypes.func,
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
    isPreparing: PropTypes.bool,
    needRefresh: PropTypes.func,
    fulfillments: PropTypes.shape({
      byId: PropTypes.object
    }),
    branches: PropTypes.shape({
      byId: PropTypes.object,
      Ids: PropTypes.array,
      branchSelectedId: PropTypes.number
    }),
    printer: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isShowRejectReason: false,
      isShowContactInfo: false,
      isShowEditFulfillment: false,
      isShowEditBagsNumber: false,
      isShowPrintReceipt: false,
      isShowPrinterSelection: false,
      isShowPrinterSetting: false,
      loading: false,
      selectedFulfillment: {}
    };
    this.onRefresh();
  }

  onRefresh = () => {
    const fulfillmentId = this.props.orderFulfillment.id;
    this.props.listenFulfillment(fulfillmentId);
  };
  onEditFulfillmentItem = async (fulfillmentId, item) => {
    await this.setState({
      selectedFulfillment: {
        fulfillmentId,
        item
      }
    });
    this.toggleEditFulfillment();
  };

  getOrderDate = dateString => getDateMonth(dateString);

  getPickupTime = dateString => getTime(dateString);

  acceptOrderFulfillments = async () => {
    if (this.state.loading) return;
    this.takePendingItem(this.props.orderFulfillment.id);
    this.showLoading(true);
    await this.props.acceptOrderFulfillments(this.props.orderFulfillment.id);
    await this.props.startOrderFulfillments(this.props.orderFulfillment.id);
    this.showLoading(false);
    this.onRefresh();
    this.props.needRefresh();
    
    const { isAutoPrint, name } = this.props.printer;
    if (isAutoPrint && name.length) {
      this.togglePrintReceipt();
    }
  };

  showLoading = isLoading => {
    this.setState({ loading: isLoading });
  };

  takePendingItem = orderFulfillmentId => {
    const id = `fulfillment-${orderFulfillmentId}`;
    const newFulfillment = this.props.fulfillments.byId[id];
    Object.keys(newFulfillment.items).forEach(itemId => {
      newFulfillment.items[itemId].fulfillmentStatus = FULFILLMENT_STATUS.FULFILLED;
      newFulfillment.items[itemId].quantityInCart = newFulfillment.items[itemId].quantity;
      if (newFulfillment.items[itemId].additionalSetItems !== undefined) {
        newFulfillment.items[itemId].fulfilledAdditionalSetItems =
          newFulfillment.items[itemId].additionalSetItems;
      }
    });
    newFulfillment.numberOfBags = 1;
    this.props.updatedFulfillment(orderFulfillmentId, newFulfillment);
  };

  rejectOrderFulfillments = () => {
    console.log(`reject pressed ${this.props.orderFulfillment.id}`);
    this.props.rejectOrderFulfillments(this.props.orderFulfillment.id);
  };

  toggleRejectReason = () => {
    this.setState({
      isShowRejectReason: !this.state.isShowRejectReason
    });
  };

  toggleContactInfo = () => {
    this.setState({
      isShowContactInfo: !this.state.isShowContactInfo
    });
  };

  toggleEditFulfillment = () => {
    this.setState({
      isShowEditFulfillment: !this.state.isShowEditFulfillment
    });
  };

  toggleEditBagsNumber = () => {
    this.setState({
      isShowEditBagsNumber: !this.state.isShowEditBagsNumber
    });
  };

  handlePrinterButton = () => {
    const { printer } = this.props;
    if (printer.address.length > 0) {
      this.togglePrintReceipt();
    } else {
      this.togglePrinterSelection();
    }
  };

  togglePrintReceipt = () => {
    this.setState({
      isShowPrintReceipt: !this.state.isShowPrintReceipt
    });
  };

  togglePrinterSelection = () => {
    this.setState({
      isShowPrinterSelection: !this.state.isShowPrinterSelection
    });
  };

  togglePrinterSetting = () => {
    this.setState({
      isShowPrinterSetting: !this.state.isShowPrinterSetting
    });
  };
  render() {
    const { orderFulfillment, fulfillments, isPreparing, branches } = this.props;
    const {
      isShowContactInfo,
      isShowRejectReason,
      isShowEditFulfillment,
      isShowEditBagsNumber,
      isShowPrintReceipt,
      isShowPrinterSelection,
      isShowPrinterSetting,
      loading,
      selectedFulfillment
    } = this.state;
    const { order, pickupTime } = orderFulfillment;

    const isEditEnable = () => {
      const currentBranch = branches.byId[branches.branchSelectedId];
      if (currentBranch) {
        return currentBranch.partialFulfillmentEnabled;
      }
      return false;
    };

    const getFulfillment = () => {
      const id = `fulfillment-${orderFulfillment.id}`;
      return fulfillments.byId[id];
    };

    const renderFulfillment = () => {
      const fulfillment = getFulfillment();
      if (fulfillment !== undefined) {
        return Object.keys(fulfillment.items).map(itemId => (
          <FulfillmentItem
            key={itemId}
            item={fulfillment.items[itemId]}
            fulfillmentId={orderFulfillment.id}
            onPressEditButton={(fulfillmentId, item) => {
              this.onEditFulfillmentItem(fulfillmentId, item);
            }}
            partialFulfillmentEnabled={isEditEnable()}
          />
        ));
      }
      return null;
    };
    const getTotalAmount = () => {
      const fulfillment = getFulfillment();
      let total = 0;
      let currency;
      if (fulfillment !== undefined) {
        Object.keys(fulfillment.items).map(itemId => {
          total += parseFloat(fulfillment.items[itemId].totalAmount);
          if (currency === undefined) {
            currency = fulfillment.items[itemId].currency;
          }
          return total;
        });
      }
      return currencyPrice(total, currency);
    };

    const renderActionButtons = () => {
      if (!isPreparing) {
        return (
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={this.toggleRejectReason}>
              <Icon name="close-circle" size={20} color={Theme.hbRed} />
              <Text style={styles.rejectText}>{Locales.t('lbl_reject')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={this.acceptOrderFulfillments}>
              <Icon
                name="check-circle"
                size={20}
                color={loading ? 'transparent' : Theme.algaeGreenColor}
              />
              <Text style={loading ? styles.whiteText : styles.acceptText}>
                {Locales.t('lbl_accept')}
              </Text>
              <ActivityIndicator
                animating
                color={loading ? Theme.algaeGreenColor : 'transparent'}
                size="large"
                style={styles.activityIndicator}
              />
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    };

    const renderBagContainer = () => {
      const fulfillment = getFulfillment();
      if (isPreparing && fulfillment !== undefined) {
        const numberOfBags = fulfillment.numberOfBags !== undefined ? fulfillment.numberOfBags : 0;
        return (
          <View style={styles.iconTitleEditRowContainer} visible={isPreparing}>
            <Text style={styles.iconTitle}>
              <BagIcon name="shopping-bag" size={16} />
              {'  '} {`${Locales.t('lbl_bags')} : ${numberOfBags}`}
            </Text>
            <TouchableOpacity onPress={this.toggleEditBagsNumber}>
              <Text style={styles.rightTextInRow}>{Locales.t('lbl_edit').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    };

    const renderPrinterContainer = () => {
      const fulfillment = getFulfillment();
      if (isPreparing && fulfillment !== undefined) {
        const printerStatus =
          fulfillment.printerStatus !== undefined
            ? Locales.t(PRINTER_STATUS.PRINTED)
            : Locales.t(PRINTER_STATUS.NOT_PRINTED);
        return (
          <View style={styles.iconTitleEditRowContainer} visible={isPreparing}>
            <Text style={styles.iconTitle}>
              <Icon name="printer" size={16} />
              {'  '} {`${Locales.t('print_status')} : ${printerStatus}`}
            </Text>
            <TouchableOpacity onPress={this.handlePrinterButton}>
              <Text style={styles.rightTextInRow}>{Locales.t('lbl_print').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    };

    const modalAnimationTypeSlide = 'slide';
    const modalAnimationTypeFade = 'fade';
    return (
      <View>
        <View style={styles.orderContainer}>
          <View style={styles.firstCellContainer}>
            <View style={styles.orderNumberContainer}>
              <Text style={styles.titleText}>{this.getOrderDate(pickupTime)}</Text>
              <Text style={styles.contentText}>#{order.orderNumber}</Text>
            </View>
            <View style={styles.pickupTimeContainer}>
              <Text style={styles.titleText}>{Locales.t('lbl_pickup')}</Text>
              <Text style={styles.contentText}>{this.getPickupTime(pickupTime)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.customerInfoContainer} onPress={this.toggleContactInfo}>
            <Text style={styles.titleText}>{Locales.t('customer_name')}</Text>
            <Text style={styles.contentText}>
              {order.user.name}
              <Icon name="phone" size={16} color={'black'} />
              ：{order.user.mobileNumber}
            </Text>
          </TouchableOpacity>
          <View style={styles.orderItemContainer}>
            {renderFulfillment()}
            <View style={styles.row}>
              <View style={{ flex: 4 }} />
              <Text style={{ flex: 2, color: Theme.darkerGray }}>{Locales.t('lbl_total')}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{getTotalAmount()}</Text>
            </View>
          </View>
          {renderBagContainer()}
          {renderPrinterContainer()}
          {renderActionButtons()}
        </View>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent={false}
          visible={isShowRejectReason}
          onRequestClose={this.toggleRejectReason}
        >
          {isShowRejectReason && (
            <RejectReasonScreen
              orderFulfillmentId={orderFulfillment.id}
              pressHideButton={this.toggleRejectReason}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent={false}
          visible={isShowContactInfo}
          onRequestClose={this.toggleContactInfo}
        >
          {isShowContactInfo && (
            <ContactInfoScreen
              orderFulfillmentId={orderFulfillment.id}
              pressHideButton={this.toggleContactInfo}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeSlide}
          transparent={false}
          visible={isShowPrinterSelection}
          onRequestClose={this.togglePrinterSelection}
        >
          {isShowPrinterSelection && (
            <PrinterSelectionScreen onPressHideButton={this.togglePrinterSelection} />
          )}
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={isShowPrinterSetting}
          onRequestClose={this.togglePrinterSetting}
        >
          <PrinterSettingScreen
            onPressHideButton={this.togglePrinterSetting}
            onPressPrinterSelection={async () => {
              await this.togglePrinterSetting();
              this.togglePrinterSelection();
            }}
          />
        </Modal>
        <Modal
          animationType={modalAnimationTypeFade}
          transparent
          visible={isShowEditBagsNumber}
          onRequestClose={this.toggleEditBagsNumber}
        >
          {isShowEditBagsNumber && (
            <BagsEditScreen
              orderFulfillmentId={orderFulfillment.id}
              fulfillment={getFulfillment()}
              onDismissView={this.toggleEditBagsNumber}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeFade}
          transparent
          visible={isShowEditFulfillment}
          onRequestClose={this.toggleEditFulfillment}
        >
          {isShowEditFulfillment && (
            <FulfillmentEditScreen
              selectedFulfillment={selectedFulfillment}
              isOrderPreparing={isPreparing}
              onDismissView={this.toggleEditFulfillment}
            />
          )}
        </Modal>
        <Modal
          animationType={modalAnimationTypeFade}
          transparent
          visible={isShowPrintReceipt}
          onRequestClose={this.togglePrintReceipt}
        >
          {isShowPrintReceipt && (
            <ReceiptScreen
              orderFulfillment={orderFulfillment}
              fulfillment={getFulfillment()}
              onDismissView={this.togglePrintReceipt}
              onPressPrinterSelection={async () => {
                await this.togglePrintReceipt();
                this.togglePrinterSetting();
              }}
            />
          )}
        </Modal>
      </View>
    );
  }
}
