import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { sprintf } from 'sprintf-js';
import NavigationBar from '../NavigationBar';
import CloseStoreModal from './CloseStoreModal';
import { updateStoreOpenStatus } from '../../actions/storeActions';
import { StoreOpenStatus } from '../../utils/appConstants';
import Theme from '../../utils/styleCollection';
import { getDateTime } from '../../utils/dateFormatter';
import Locales from '../../locales';

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 16
  },
  title: {
    padding: 16,
    color: Theme.hbOrange,
    borderWidth: 1,
    borderColor: Theme.hbOrange,
    borderRadius: 2
  },
  storeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },
  label: {
    color: 'black',
    fontSize: 16
  },
  subLabel: {
    color: Theme.darkerGray,
    fontSize: 14
  }
});

const mapDispatchToProps = {
  updateStoreOpenStatus
};

@connect(undefined, mapDispatchToProps)
export default class StoreStatusScreen extends Component {
  static propTypes = {
    pressHideButton: PropTypes.func,
    closed: PropTypes.bool,
    temporarilyClosed: PropTypes.bool,
    opensAt: PropTypes.string,
    updateStoreOpenStatus: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      storeSwitchValue: !this.props.closed,
      closeStoreModalVisible: false
    };
  }

  onCloseStoreSave = (durationType, duration) => {
    this.setState({ closeStoreModalVisible: false });
    this.props.updateStoreOpenStatus(
      this.onUpdateStoreOpenStatusError,
      StoreOpenStatus.CLOSE,
      durationType,
      duration
    );
  };

  onCloseStoreCancel = () => {
    this.setState({
      storeSwitchValue: true,
      closeStoreModalVisible: false
    });
  };

  onStoreToggle = isOpen => {
    this.setState({ storeSwitchValue: isOpen });

    if (isOpen) {
      this.props.updateStoreOpenStatus(this.onUpdateStoreOpenStatusError, StoreOpenStatus.OPEN);
    } else {
      this.setState({ closeStoreModalVisible: true });
    }
  };

  onUpdateStoreOpenStatusError = () => {
    this.setState({ storeSwitchValue: !this.state.storeSwitchValue });
  };

  render() {
    const opensAtText =
      this.props.closed && this.props.opensAt
        ? sprintf(Locales.t('close_store_until_date'), getDateTime(this.props.opensAt))
        : null;

    return (
      <View>
        <NavigationBar
          title={Locales.t('title_store_status')}
          onIconPress={this.props.pressHideButton}
        />

        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{Locales.t('msg_close_store')}</Text>
          <View style={styles.storeToggleContainer}>
            <View>
              <Text style={styles.label}>
                {this.props.closed ? Locales.t('lbl_store_closed') : Locales.t('lbl_store_open')}
              </Text>
              {opensAtText && <Text style={styles.subLabel}>{opensAtText}</Text>}
            </View>
            <Switch
              value={this.state.storeSwitchValue}
              onValueChange={this.onStoreToggle}
              disabled={this.props.closed && !this.props.temporarilyClosed}
            />
          </View>
        </View>

        <CloseStoreModal
          visible={this.state.closeStoreModalVisible}
          onCancel={this.onCloseStoreCancel}
          onSave={this.onCloseStoreSave}
        />
      </View>
    );
  }
}
