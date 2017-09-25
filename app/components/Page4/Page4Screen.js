import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../NavigationBar';
import DrawerItemComponent from '../DrawerItemComponent';
import Locales from '../../locales';
import Theme from '../../utils/styleCollection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbGray
  }
  
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
 
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Page4Screen extends Component {
  static navigationOptions = {
    drawerLabel: (<DrawerItemComponent title={'Page4'}/>)
  };
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  onInitializeState = () => {
  d
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'Page4'}
          iconName="menu"
          onIconPress={() => {
            navigation.navigate('DrawerOpen');
          }}
        >
        
        </NavigationBar>

        
      </View>
    );
  }
}
