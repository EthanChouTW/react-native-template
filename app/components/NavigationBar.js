import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../utils/styleCollection';
import StatusBarBackground from './StatusBarBackground';

const styles = StyleSheet.create({
  container: {},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: 'transparent',
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
  imageBackground: {
    width: 100,
    height: 30,
    resizeMode: 'repeat'
  },
  iconButton: {
    backgroundColor: 'transparent',
    width: 40
  },
  title: {
    backgroundColor: 'transparent',
    marginTop: -4,
    color: 'white',
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
  <LinearGradient
    start={{ x: 0.0, y: 0.0 }}
    end={{ x: 2.0, y: 1.0 }}
    locations={[0, 0.5, 0.6]}
    colors={['#0DC0B0', '#47D37F', '#78E355']}
    style={styles.container}
  >
    <StatusBarBackground />
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.iconButton} onPress={props.onIconPress}>
        {props.iconName === 'ios-arrow-back' && (
          <BackIcon name={props.iconName} size={30} color="white" />
        )}

        {props.iconName !== 'ios-arrow-back' && (
          <Icon
            name={props.iconName === undefined ? 'close' : props.iconName}
            size={24}
            color="white"
          />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{props.title}</Text>

      <View style={styles.rightButtons}>{props.children}</View>
    </View>
  </LinearGradient>
);

NavigationBar.propTypes = {
  onIconPress: PropTypes.func,
  title: PropTypes.string,
  iconName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object
  ])
};

NavigationBar.defaultProps = {
  children: []
};

export default NavigationBar;
