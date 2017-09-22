import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import Alert from './Alert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapStateToProps = state => ({
  alerts: state.alerts
});

@connect(mapStateToProps)
export default class AlertContainer extends Component {
  static propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string
    })).isRequired
  };
  render() {
    const alerts = this.props.alerts.map(alert => (
      <Alert alert={alert} key={alert.id} />
    ));
    return (
      <View style={styles.container}>
        {alerts}
      </View>
    );
  }
}

