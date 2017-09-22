import React, { PureComponent } from 'react';
import { DrawerItems } from 'react-navigation';
import {
  Platform,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBarBackground from './StatusBarBackground';
import Theme from '../utils/styleCollection';
import { version } from '../../package.json';
import { DRAWER_OPEN } from '../utils/appConstants';

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white'
  },
  versioning: {
    color: Theme.hbGray,
    padding: 16,
    fontSize: 16
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'white'
  },
  cancelButton: {
    padding: 16,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomLine: {
  }
});

export default class SlideMenuScreen extends PureComponent {
  onPressLeftBarButton = () => {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('DrawerClose');
    }
  };

  render() {
    return (
      <View style={styles.drawer}>
        <View style={styles.statusBar} />
        <TouchableOpacity style={styles.cancelButton} onPress={this.onPressLeftBarButton}>
          <Icon name={'close'} size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 5 }}>
          <DrawerItems {...this.props} />
        </View>
        <Text style={styles.versioning}>version: v{version}</Text>
      </View>
    );
  }
}
