import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Theme from '../utils/styleCollection';
import StatusBarBackground from './StatusBarBackground';

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    backgroundColor: Theme.hbYellow,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        padding: 8,
        paddingLeft: 12
      },
      android: {
        padding: 16
      }
    })
  },
  title: {
    marginTop: -4,
    color: 'black',
    fontSize: 20,
    paddingLeft: 16
  },
  rightButtons: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row'
  }
});

const NavigationBar = props => (
  <View>
    <StatusBarBackground />
    <View style={styles.topBar}>
      <TouchableOpacity onPress={props.onIconPress}>
        <Icon
          name={props.iconName === undefined ? 'close' : props.iconName}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <View style={styles.rightButtons}>{props.children}</View>
    </View>
  </View>
);

NavigationBar.propTypes = {
  onIconPress: PropTypes.func,
  title: PropTypes.string,
  iconName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.object])
};

NavigationBar.defaultProps = {
  children: []
};

export default NavigationBar;
