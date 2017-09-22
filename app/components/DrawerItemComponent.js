import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Theme from '../utils/styleCollection';

const styles = StyleSheet.create({
  drawerLabel: {
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Theme.hbGray
  },
  drawerText: {
    fontSize: 16,
    color: '#393939',
    fontWeight: 'bold'
  }
});

const DrawerItemComponent = props => (
  <View style={styles.drawerLabel}>
    <Text style={styles.drawerText}>{props.title}</Text>
    <View style={styles.bottomLine}/>
  </View>
);

DrawerItemComponent.propTypes = {
  title: PropTypes.string
};
export default DrawerItemComponent;
