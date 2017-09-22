import React, { PureComponent } from 'react';
import { DrawerItems } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../utils/styleCollection';
import { version } from '../../package.json';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'black'
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    height: 60
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  userName: {
    color: 'white',
    fontSize: 16
  },
  email: {
    color: Theme.hbGray,
    fontSize: 14
  },
  versioning: {
    color: Theme.hbGray,
    padding: 16,
    fontSize: 16
  }
});

export default class SlideMenuScreen extends PureComponent {
  render() {
    return (
      <View style={styles.drawer}>
        <View style={{ flex: 1 }}>
          <DrawerItems {...this.props} />
        </View>
        <Text style={styles.versioning}>
          version: v{version}
        </Text>
      </View>
    );
  }
}
