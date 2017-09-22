import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  updatedFulfillment,
  FULFILLMENT_STATUS
} from '../actions/fulfillmentsActions';
import { syncFulfillmentItems } from '../actions/orderFulfillmentsActions';
import Theme from '../utils/styleCollection';
import Locale, { currencyPrice } from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbTransparentBlack
  },
  fulfillmentEditContainerWithoutWarning: {
    marginHorizontal: 30,
    padding: 15,
    height: 280,
    borderRadius: 5,
    backgroundColor: Theme.whiteColor
  },
  fulfillmentEditContainerWithWarning: {
    marginHorizontal: 30,
    padding: 15,
    height: 300,
    borderRadius: 5,
    backgroundColor: Theme.whiteColor
  },
  itemTitle: {
    flex: 1.5,
    justifyContent: 'center'
  },
  itemTitleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  amountAndQuantity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  amountText: {
    flex: 1,
    color: Theme.hbTextGray
  },
  quantityText: {
    color: Theme.hbTextGray
  },
  newQuantityTitle: {
    flex: 0.8,
    justifyContent: 'flex-end'
  },
  newQuantityTitleText: {
    fontSize: 12,
    color: Theme.hbTextGray
  },
  newQuantityInputWithOutWarning: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Theme.algaeGreenColor,
    borderBottomWidth: 1
  },
  newQuantityInputWithWarning: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Theme.hbRed,
    borderBottomWidth: 1
  },
  newQuantityInputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  newQuantityInputUnit: {
    fontSize: 16,
    color: Theme.hbTextGray
  },
  warning: {
    flex: 2,
    justifyContent: 'center'
  },
  warningText: {
    color: Theme.hbRed
  },
  reminding: {
    flex: 2,
    justifyContent: 'center'
  },
  remindingText: {
    color: Theme.hbTextGray
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  contactInfoText: {
    color: Theme.hbTextGray
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButton: {
    marginTop: 5,
    marginLeft: 10,
    padding: 5,
    alignItems: 'flex-end'
  },
  actionButtonText: {
    color: Theme.algaeGreenColor
  }
});

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  fulfillments: state.fulfillments,
  orderFulfillments: state.orderFulfillments
});

const mapDispatchToProps = {
  updatedFulfillment,
  syncFulfillmentItems
};

@connect(mapStateToProps, mapDispatchToProps)
export default class FulfillmentEditScreen extends Component {
  static propTypes = {
    selectedFulfillment: PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.string,
        quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        quantityInCart: PropTypes.number
      }),
      fulfillmentId: PropTypes.number
    }),
    fulfillments: PropTypes.shape({
      byId: PropTypes.object
    }),
    updatedFulfillment: PropTypes.func,
    syncFulfillmentItems: PropTypes.func,
    orderFulfillments: PropTypes.shape({
      byId: PropTypes.object
    }),
    isOrderPreparing: PropTypes.bool,
    onDismissView: PropTypes.func
  };

  constructor(props) {
    super(props);
    const item = props.selectedFulfillment.item;
    const currentQuantity =
      item.quantityInCart !== undefined ? item.quantityInCart : item.quantity;
    this.state = {
      itemQuantityInCart: parseInt(currentQuantity, 10),
      isShowWarning: false
    };
  }

  updateFulfillment = async () => {
    const { isOrderPreparing, selectedFulfillment, fulfillments } = this.props;
    const { fulfillmentId, item } = selectedFulfillment;
    const updatedItemQuantity = parseInt(this.state.itemQuantityInCart, 10);
    const originalItemQuantity = parseInt(item.quantity, 10);
    if (updatedItemQuantity > originalItemQuantity) {
      return this.setState({
        isShowWarning: true
      });
    }

    this.setState({
      isShowWarning: false
    });

    const id = `fulfillment-${fulfillmentId}`;
    const newFulfillment = fulfillments.byId[id];
    const updatedItem = fulfillments.byId[id].items[item.id];
    updatedItem.quantityInCart = updatedItemQuantity;
    if (updatedItemQuantity === 0) {
      updatedItem.fulfillmentStatus = FULFILLMENT_STATUS.OUT_OF_STOCK;
    } else if (updatedItemQuantity < originalItemQuantity) {
      updatedItem.fulfillmentStatus = FULFILLMENT_STATUS.REPLACED;
    } else if (updatedItemQuantity === originalItemQuantity) {
      updatedItem.fulfillmentStatus = FULFILLMENT_STATUS.FULFILLED;
    }

    newFulfillment.items[item.id] = updatedItem;
    // TODO: need loading view here, sync to firebase then to backend taking long time
    await this.props.updatedFulfillment(fulfillmentId, newFulfillment);
    if (isOrderPreparing) {
      this.props.syncFulfillmentItems(fulfillmentId);
    }
    return null;
  };

  render() {
    const { isShowWarning } = this.state;
    const { selectedFulfillment, orderFulfillments } = this.props;
    const { fulfillmentId, item } = selectedFulfillment;
    const { user } = orderFulfillments.byId[fulfillmentId].order;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ flex: 1 }} />
        <View
          style={
            isShowWarning
              ? styles.fulfillmentEditContainerWithWarning
              : styles.fulfillmentEditContainerWithoutWarning
          }
        >
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitleText}>
              {item.itemTitle}
            </Text>
          </View>
          <View style={styles.amountAndQuantity}>
            <Text style={styles.amountText}>
              {`${currencyPrice(item.amount, item.currency)} ${Locale.t(
                'lbl_price_per_item'
              )}`}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={styles.quantityText}>{`${parseInt(item.quantity, 10)} ${Locale.t(
                'items'
              )}`}</Text>
            </View>
          </View>
          <View style={styles.newQuantityTitle}>
            <Text style={styles.newQuantityTitleText}>
              {Locale.t('lbl_new_quantity')}
            </Text>
          </View>
          <View
            style={
              this.state.isShowWarning
                ? styles.newQuantityInputWithWarning
                : styles.newQuantityInputWithOutWarning
            }
          >
            <TextInput
              style={styles.newQuantityInputText}
              onChangeText={quantity => {
                this.setState({
                  itemQuantityInCart: quantity
                    ? parseInt(quantity, 10)
                    : parseInt(item.quantity, 10)
                });
              }}
              keyboardType={'numeric'}
              maxLength={2}
              placeholder={this.state.itemQuantityInCart.toString()}
              underlineColorAndroid="rgba(0,0,0,0)"
            />
            <Text style={styles.newQuantityInputUnit}>{`${Locale.t(
              'items'
            )}`}</Text>
          </View>
          {isShowWarning &&
            <View style={styles.warning}>
              <Text style={styles.warningText}>
                {Locale.t('lbl_new_quantity_error_msg')}
              </Text>
            </View>}

          <View style={styles.reminding}>
            <Text style={styles.remindingText}>
              {Locale.t('lbl_new_quantity_notice')}
            </Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactInfoText}>
              {`${Locale.t('lbl_customer')}`} <Icon name="phone" />:{' '}
              {user.mobileNumber}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                this.props.onDismissView();
              }}
            >
              <Text style={styles.actionButtonText}>
                {Locale.t('lbl_cancel').toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                await this.updateFulfillment();
                if (this.state.isShowWarning === false) {
                  this.props.onDismissView();
                }
              }}
            >
              <Text style={styles.actionButtonText}>
                {Locale.t('lbl_update').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    );
  }
}
