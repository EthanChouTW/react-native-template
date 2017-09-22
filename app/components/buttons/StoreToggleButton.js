import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Locales from '../../locales';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 16
  }
});

const StoreToggleButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Icon name="timer" size={20} color="black" />
    <Text>{props.isStoreOpen ? Locales.t('lbl_store_open_status_open') : Locales.t('lbl_store_open_status_close')}</Text>
  </TouchableOpacity>
);

StoreToggleButton.propTypes = {
  isStoreOpen: PropTypes.bool,
  onPress: PropTypes.func
};
export default StoreToggleButton;
