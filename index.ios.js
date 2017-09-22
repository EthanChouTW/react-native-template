/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { Client } from 'bugsnag-react-native';
import App from './app/components/App';
import { configureStore } from './app/store';

/* eslint-disable no-unused-vars */
const bugsnag = new Client();
/* eslint-enable no-unused-vars */

export default class NDCHealth extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('NDCHealth', () => NDCHealth);
