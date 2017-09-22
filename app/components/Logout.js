import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { logoutUser } from '../actions/authActions';
import Locales from '../locales';
import Theme from '../utils/styleCollection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.transparentBlack,
    elevation: 4
  }
});

const mapStateToProps = state => ({
  beeId: state.auth.beeId,
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = {
  logoutUser
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Logout extends Component {
  static propTypes = {
    logoutUser: PropTypes.func,
    accessToken: PropTypes.string
  };

  static navigationOptions = {
    drawerLabel: Locales.t('lbl_logout')
  }

  componentDidMount() {
    this.props.logoutUser(this.props.accessToken);
  }

  render() {
    return (<ActivityIndicator
      style={styles.loadingView}
      animating
      size="large"
    />);
  }
}
