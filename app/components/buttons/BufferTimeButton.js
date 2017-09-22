import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 16
  }
});

const BufferTimeButton = props => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Icon name="food" size={20} color="black" />
    <Text>{`${props.bufferTime}m`}</Text>
  </TouchableOpacity>
);

BufferTimeButton.propTypes = {
  bufferTime: PropTypes.number,
  onPress: PropTypes.func
};
export default BufferTimeButton;
