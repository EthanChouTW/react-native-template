import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Theme from '../../utils/styleCollection';
import Locales from '../../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbTransparentBlack
  },
  alertContainer: {
    marginHorizontal: 30,
    padding: 15,
    height: 150,
    borderRadius: 5,
    backgroundColor: Theme.whiteColor
  },
  itemTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  itemTitleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButton: {
    marginTop: 5,
    padding: 5,
    paddingRight: 10,
    alignItems: 'flex-end'
  },
  actionButtonText: {
    color: Theme.algaeGreenColor,
    fontWeight: 'bold'
  }
});

const GeneralAlertComponent = props => (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={{ flex: 1 }} />
    <View style={styles.alertContainer}>
      <View style={styles.itemTitle}>
        <Text style={styles.itemTitleText}>{props.title}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={props.onDismissView}
        >
          <Text style={styles.actionButtonText}>{Locales.t('lbl_ok').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={{ flex: 1 }} />
  </KeyboardAvoidingView>
);

GeneralAlertComponent.propTypes = {
  onDismissView: PropTypes.func,
  title: PropTypes.string
};

export default GeneralAlertComponent;
