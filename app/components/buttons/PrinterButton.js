
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 16
  }
});

const PrinterButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Icon name="printer" size={20} color="black" />
  </TouchableOpacity>
);

PrinterButton.propTypes = {
  onPress: PropTypes.func
};
export default PrinterButton;
