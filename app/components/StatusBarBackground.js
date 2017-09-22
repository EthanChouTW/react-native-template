import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Theme from '../utils/styleCollection';

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: Theme.hbYellow
  }
});

const StatusBarBackground = () => (
  <View style={styles.statusBarBackground} />
);

export default StatusBarBackground;
