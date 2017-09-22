import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioButton from '../buttons/RadioButton';
import RadioGroup from '../buttons/RadioGroup';
import { DurationTypes } from '../../utils/appConstants';
import Theme from '../../utils/styleCollection';
import Locales from '../../locales';

const DEFAULT_MINUTES_DURATION = 20;
const DEFAULT_HOURS_DURATION = 1;
const DAYS_DURATION_TODAY = 1;
const DEFAULT_DAYS_INPUT = '2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.modalGreyOut,
    justifyContent: 'center'
  },
  dialogContainer: {
    padding: 24,
    marginHorizontal: 40,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    color: Theme.blackTwo54,
    marginBottom: 16
  },
  radioGroup: {
    marginLeft: -8
  },
  radioButtonLabel: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 12
  },
  daysRadioButton: {
    marginTop: -10,
    alignItems: 'center'
  },
  daysTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8.5,
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: Theme.shamrockGreen,
    marginRight: Platform.OS === 'ios' ? 10 : 0
  },
  daysTextInput: {
    height: 40,
    width: '100%',
    fontSize: 16,
    color: 'black'
  },
  daysLabel: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 0 : 10,
    bottom: 10,
    fontSize: 16,
    color: Theme.darkerGray
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  buttonText: {
    fontSize: 16,
    marginTop: 8,
    color: Theme.shamrockGreen,
    fontWeight: 'bold',
    marginLeft: 20
  }
});

const defaultState = {
  selectedIndex: 0,
  saveBtnDisabled: false,
  daysInput: DEFAULT_DAYS_INPUT
};

export default class CloseStoreModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  onSelect = index => {
    this.setState({ selectedIndex: index });

    if (index !== 3) {
      this.daysTextInputRef.blur();
    }
  };

  onDaysChang = daysInput => {
    const days = parseInt(daysInput, 10);

    if (!isNaN(days) && days >= 1 && days <= 7) {
      this.setState({ saveBtnDisabled: false, daysInput });
    } else {
      this.setState({ saveBtnDisabled: true, daysInput: '' });
    }
  };

  onSave = () => {
    let durationType;
    let duration;

    switch (this.state.selectedIndex) {
      default:
      case 0:
        durationType = DurationTypes.MINUTES;
        duration = DEFAULT_MINUTES_DURATION;
        break;
      case 1:
        durationType = DurationTypes.HOURS;
        duration = DEFAULT_HOURS_DURATION;
        break;
      case 2:
        durationType = DurationTypes.DAYS;
        duration = DAYS_DURATION_TODAY;
        break;
      case 3:
        durationType = DurationTypes.DAYS;
        duration = parseInt(this.state.daysInput, 10);
        break;
    }

    this.props.onSave(durationType, duration);
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onShow={() => this.setState(defaultState)}
        onRequestClose={this.props.onCancel}
      >
        <View style={styles.container}>
          <View style={styles.dialogContainer}>
            <Text style={styles.title}>{Locales.t('close_store_dialog_title')}</Text>

            <RadioGroup
              style={styles.radioGroup}
              color={Theme.darkerGray}
              activeColor={Theme.shamrockGreen}
              selectedIndex={this.state.selectedIndex}
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton>
                <Text style={styles.radioButtonLabel}>
                  {Locales.t('close_store_duration_minutes')}
                </Text>
              </RadioButton>

              <RadioButton>
                <Text style={styles.radioButtonLabel}>
                  {Locales.t('close_store_duration_hours')}
                </Text>
              </RadioButton>

              <RadioButton>
                <Text style={styles.radioButtonLabel}>{Locales.t('today')}</Text>
              </RadioButton>

              <RadioButton style={styles.daysRadioButton}>
                <View style={styles.daysTextInputContainer}>
                  <TextInput
                    ref={ref => (this.daysTextInputRef = ref)}
                    style={styles.daysTextInput}
                    underlineColorAndroid={Theme.shamrockGreen}
                    onChangeText={this.onDaysChang}
                    keyboardType={'numeric'}
                    maxLength={1}
                    value={this.state.daysInput}
                    onFocus={() => this.setState({ selectedIndex: 3 })}
                  />
                  <Text style={styles.daysLabel}>{Locales.t('days')}</Text>
                </View>
              </RadioButton>
            </RadioGroup>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.props.onCancel}>
                <Text style={styles.buttonText}>{Locales.t('lbl_cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onSave} disabled={this.state.saveBtnDisabled}>
                <Text
                  style={[
                    styles.buttonText,
                    this.state.saveBtnDisabled && { color: Theme.disabledGreen }
                  ]}
                >
                  {Locales.t('lbl_save')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
