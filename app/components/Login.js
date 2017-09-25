import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { loginUser } from '../actions/authActions';
import StyleCollection from '../utils/styleCollection';
import Locales from '../locales';

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'stretch'
  },
  emailfield: {
    width: '60%',
    margin: 8,
    marginTop: '25%',
    padding: 4,
    paddingLeft: 8,
    backgroundColor: StyleCollection.textFieldBackgroundColor
  },
  passwordfield: {
    width: '60%',
    margin: 8,
    marginTop: 4,
    padding: 4,
    paddingLeft: 8,
    backgroundColor: StyleCollection.textFieldBackgroundColor
  },
  textInput: {
    height: 40
  },
  buttonContainer: {
    margin: 8,
    marginTop: 20,
    width: '60%',
    padding: 12,
    backgroundColor: StyleCollection.algaeGreenColor,
    borderRadius: 2,
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  button: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'white'
  },
  formError: {
    color: 'red'
  },
  loadingView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleCollection.transparentBlack,
    elevation: 4
  }
});

const renderEmail = (field) => (
  <View style={styles.emailfield}>
    <TextInput
      {...field.input}
      placeholder={'username'}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      style={styles.textInput}
    />
  </View>
);

const renderPassword = (field) => (
  <View style={styles.passwordfield}>
    <TextInput
      {...field.input}
      placeholder={'password'}
      secureTextEntry
      style={styles.textInput}
    />
  </View>
);

@reduxForm({ form: 'login' })
export default class Login extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const onSignIn = (values, dispatch) =>
      dispatch(loginUser(values.email, values.password, Platform.OS));

    const loadingView = () => {
      if (submitting) {
        return (<ActivityIndicator
          style={styles.loadingView}
          animating
          size="large"
        />);
      }
      return null;
    };

    return (
      <View style={{ flex: 1, backgroundColor: 'gray' }}>
        <ImageBackground
            /* eslint-disable global-require */
          /* source={require('../../assets/image/photo_bg.jpg')} */
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.inputContainer}>
            <Field
              name="email"
              component={renderEmail}
              type="email"
            />
            <Field
              name="password"
              component={renderPassword}
              type="password"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={submitting ? null : handleSubmit(onSignIn)}>
                <Text style={styles.button}>{'Login'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {loadingView()}
      </View>
    );
  }
}
