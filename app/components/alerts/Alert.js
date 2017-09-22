import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { removeAlert } from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
    borderTopWidth: 2
  },
  text: {
    color: '#a94442'
  }
});

@connect()
export default class Alert extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    alert: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string
    }).isRequired
  };

  constructor(props) {
    super(props);
    const { dispatch, alert } = props;
    this.onRemoveAlert = () => dispatch(removeAlert(alert.id));
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onRemoveAlert}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {this.props.alert.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

