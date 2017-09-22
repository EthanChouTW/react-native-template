import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from './NavigationBar';
import Locales from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA'
  },
  columnTitle: {
    paddingLeft: 16,
    paddingTop: 24,
    paddingBottom: 8
  },
  userInfoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  userInfoText: {
    fontSize: 16,
    color: 'black'
  },
  infoText: {
    flex: 6,
    fontSize: 16,
    color: 'black'
  },
  contactInfoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  infoTitle: {
    flex: 1,
    fontSize: 12,
    paddingRight: 24
  },
  constactContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F2F2F2',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  contactMethod: {
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    flexDirection: 'row',
    ...Platform.select({
      ios: { fontFamily: 'Arial' },
      android: { fontFamily: 'Roboto' }
    }),
    fontSize: 14,
    fontWeight: '500',
    color: '#07C748',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  orderFulfillments: state.orderFulfillments.byId
});

@connect(mapStateToProps)
export default class ContactInfoScreen extends Component {
  static propTypes = {
    pressHideButton: PropTypes.func,
    orderFulfillmentId: PropTypes.number,
    orderFulfillments: PropTypes.shape({
      byId: PropTypes.object
    })
  };
  render() {
    const orderFulfillment = this.props.orderFulfillments[this.props.orderFulfillmentId];
    const { address1, address2, postalCode } = orderFulfillment.order.shippingAddress;
    const { user } = orderFulfillment.order;
    const fullAddress = `${address1}, ${address2}, ${postalCode}`;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('lbl_customer_info')}
          onIconPress={this.props.pressHideButton}
        />
        <View style={styles.columnTitle}>
          <Text>{Locales.t('customer_name')}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>{user.name}</Text>
          <Text style={styles.userInfoText}>{user.email}</Text>
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.infoTitle}>{Locales.t('lbl_address')}</Text>
          <Text style={styles.infoText}>{fullAddress}</Text>
        </View>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.infoTitle}>{Locales.t('lbl_phone')}</Text>
          <Text style={styles.infoText}>{user.mobileNumber}</Text>
        </View>
        <View style={styles.constactContainer}>
          <TouchableOpacity
            style={styles.contactMethod}
            onPress={() => {
              Communications.text(user.mobileNumber);
            }}
          >
            <Icon name="sms" size={20} color="#07C748" />
            <Text style={styles.text}>{Locales.t('lbl_sms')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactMethod}
            onPress={() => {
              Communications.phonecall(user.mobileNumber, true);
            }}
          >
            <Icon name="phone" size={20} color="#07C748" />
            <Text style={styles.text}>{Locales.t('lbl_call')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
