import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import NavigationBar from './NavigationBar';
import Theme from '../utils/styleCollection';
import { updateBufferTime } from '../actions/storeActions';
import Locales from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FAFAFA'
  },
  title: {
    padding: 16,
    color: Theme.hbOrange,
    borderWidth: 1,
    borderColor: Theme.hbOrange,
    borderRadius: 2
  },
  bufferTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16
  },
  buttonLayout: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.algaeGreenColor,
    borderRadius: 2,
    margin: 16
  },
  buttonLayoutGray: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.darkerGray,
    borderRadius: 2,
    margin: 16
  },
  buttonText: {
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    color: 'white',
    fontWeight: 'bold'
  }
});

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  bufferTime: state.store.bufferTime
});

const mapDispatchToProps = {
  updateBufferTime
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BufferTimeScreen extends Component {
  static propTypes = {
    updateBufferTime: PropTypes.func,
    pressHideButton: PropTypes.func,
    bufferTime: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      currentBufferTime: this.props.bufferTime
    };
  }

  updateStoreBufferTime = async () => {
    console.log(`Update buffer time start, buffer time: ${this.state.currentBufferTime}`);
    await this.props.updateBufferTime(this.state.currentBufferTime);
    console.log(`Update buffer time complete, buffer time: ${this.props.bufferTime}`);
    this.props.pressHideButton();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('title_change_buffer_time')}
          onIconPress={this.props.pressHideButton}
        />
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>
            {Locales.t('msg_change_buffer_time')}
          </Text>
        </View>
        <View style={styles.bufferTimeContainer}>
          <TextInput
            style={{ color: 'black', width: 50 }}
            onChangeText={(time) => this.setState({ currentBufferTime: time })}
            keyboardType={'numeric'}
            maxLength={2}
            placeholder={this.props.bufferTime.toString()}
          />
          <Text>{Locales.t('lbl_mins')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLayoutGray}
            onPress={this.props.pressHideButton}
          >
            <Text style={styles.buttonText}>{Locales.t('lbl_cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLayout}
            onPress={this.updateStoreBufferTime}
          >
            <Text style={styles.buttonText}>{Locales.t('lbl_update')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

