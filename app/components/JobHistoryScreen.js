import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import NavigationBar from './NavigationBar';
import { DRAWER_OPEN } from '../utils/appConstants';
import Locales, { currencyPrice } from '../locales';
import Theme from '../utils/styleCollection';

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
export default class JobHistoryScreen extends Component {
  static navigationOptions = {
    drawerLabel: Locales.t('ab_title_job_history')
  };
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }


  onInitializeState = () => {

  };

  onPressLeftBarButton = () => {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate(DRAWER_OPEN);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('ab_title_job_history')}
          iconName="menu"
          onIconPress={this.onPressLeftBarButton}
        />
      
      </View>
    );
  }
}
