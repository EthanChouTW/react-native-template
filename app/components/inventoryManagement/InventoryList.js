import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Locales, { currencyPrice } from '../../locales';
import Theme from '../../utils/styleCollection';
import { PRODUCT_STATUS_AVAILABLE } from '../../actions/productActions';

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    paddingVertical: 300
  },
  listContainer: {
    backgroundColor: Theme.hbGray,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    shadowColor: 'black',
    shadowRadius: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5
  },
  statusButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: Theme.hbGray
  },
  availableText: {
    textAlign: 'center',
    color: Theme.algaeGreenColor
  },
  outOfStockText: {
    textAlign: 'center',
    color: Theme.hbRed
  },
  priceText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: Theme.hbGray
  },
  titleText: {
    paddingTop: 10,
    paddingHorizontal: 10
  }
});

const InventoryList = props => {
  const renderItem = element => (
    <View key={element.item.id} style={styles.card}>
      <Text style={styles.titleText}>{element.item.title}</Text>

      <Text style={styles.priceText}>
        {`${currencyPrice(element.item.price, element.item.currency)}`}
      </Text>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => {
          props.onUpdateProductStatus(element.item.id);
        }}
      >
        {props.isChangingStatus === true && props.changingProductId === element.item.id ? (
          <ActivityIndicator animating color={Theme.algaeGreenColor} size="small" />
        ) : (
          <Text
            style={
              element.item.status === PRODUCT_STATUS_AVAILABLE ? (
                styles.availableText
              ) : (
                styles.outOfStockText
              )
            }
          >
            {element.item.status === PRODUCT_STATUS_AVAILABLE ? (
              Locales.t('available').toUpperCase()
            ) : (
              Locales.t('lbl_out_of_stock').toUpperCase()
            )}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
  return (
    <FlatList
      removeClippedSubviews={false}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
      data={props.data}
      extraData={props.extraData}
      renderItem={renderItem}
      keyExtractor={product => product.id}
      contentContainerStyle={styles.listContainer}
      onEndReached={props.onEndReached}
      onEndReachedThreshold={5}
    />
  );
};

InventoryList.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  isChangingStatus: PropTypes.bool,
  changingProductId: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string
    })
  ),
  extraData: PropTypes.shape({
    data: PropTypes.array
  }),
  onEndReached: PropTypes.func,
  onUpdateProductStatus: PropTypes.func
};

export default InventoryList;
