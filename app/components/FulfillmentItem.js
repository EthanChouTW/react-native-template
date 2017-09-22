import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Locales, { currencyPrice } from '../locales';
import Theme from '../utils/styleCollection';

const styles = StyleSheet.create({
  row: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: -1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemContainer: {
    flexDirection: 'row'
  },
  quantityContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 5
  },
  amountContainer: {
    flex: 2,
    alignItems: 'flex-end'
  },
  addonContainer: {
    marginTop: 5
  },
  quantity: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  quantityMoreThanOne: {
    color: Theme.hbRed,
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    color: 'black',
    fontSize: 16
  },
  amount: {
    color: 'black',
    fontSize: 16
  },
  editButton: {
    marginTop: 5,
    flex: 1,
    alignItems: 'flex-start'
  },
  editButtonTitle: {
    fontWeight: 'bold',
    color: Theme.algaeGreenColor
  },
  addonItem: {
    color: Theme.hbLightGray
  },
  notes: {
    paddingTop: 5,
    color: Theme.hbRed,
    fontSize: 14
  }
});

export default class FulfillmentItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      itemTitle: PropTypes.string,
      quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      currency: PropTypes.string
    }).isRequired,
    fulfillmentId: PropTypes.number,
    onPressEditButton: PropTypes.func,
    partialFulfillmentEnabled: PropTypes.bool
  };

  render() {
    const { fulfillmentId, item, onPressEditButton, partialFulfillmentEnabled } = this.props;
    const renderAddonItems = () =>
    (
      item.additionalSetItems
        ? Object.keys(item.additionalSetItems).map(addonKey => {
          const quantityDisplay =
              item.additionalSetItems[addonKey].quantity > 1
                ? `(x${item.additionalSetItems[addonKey].quantity})`
                : '';
          const titleDisplay = item.additionalSetItems[addonKey].title;
          return (
            <Text key={addonKey} style={styles.addonItem}>
              {`${titleDisplay} ${quantityDisplay}`}
            </Text>
          );
        })
        : null);

    const renderItemNotes = () =>
    (item.notes ? (
      <Text style={styles.notes}>
        {`${item.notes}`}
      </Text>
      ) : null);

    const renderEditQuantity = () => {
      if (partialFulfillmentEnabled) {
        return (
          <TouchableOpacity
            style={styles.editButton}
            visible={partialFulfillmentEnabled}
            onPress={() => {
              onPressEditButton(fulfillmentId, item);
            }}
          >
            <Text style={styles.editButtonTitle}>{Locales.t('lbl_edit').toUpperCase()}</Text>
          </TouchableOpacity>
        );
      }
      return null;
    };

    const itemQuantity = item.quantityInCart !== undefined ? item.quantityInCart : item.quantity;

    return (
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <View style={styles.quantityContainer}>
            <Text
              style={this.props.item.quantity > 1 ? styles.quantityMoreThanOne : styles.quantity}
            >
              x{parseInt(itemQuantity, 10)}
            </Text>
            {renderEditQuantity()}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.item.itemTitle}</Text>
            <View style={styles.addonContainer}>{renderAddonItems()}</View>
            {renderItemNotes()}
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>
              {currencyPrice(this.props.item.amount, this.props.item.currency)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
