import React, { PureComponent } from 'react';
import codePush from 'react-native-code-push';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import Login from './Login';
import Main from './Main';
import AlertContainer from './alerts/AlertContainer';

const MainView = props => {
  if (props.isReduxStoreReady === false) {
    return null;
  }
  if (props.beeId !== undefined) {
    return <Main />;
  }
  return <Login />;
};

MainView.propTypes = {
  beeId: PropTypes.string,
  isReduxStoreReady: PropTypes.bool
};

const mapStateToProps = state => ({ auth: state.auth });

@connect(mapStateToProps)
@codePush
export default class App extends PureComponent {
  static propTypes = {
    auth: PropTypes.shape({
      beeId: PropTypes.string,
      isReduxStoreReady: PropTypes.bool
    })
  };

  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  render() {
    const { beeId, isReduxStoreReady } = this.props.auth;

    return (
      <View
        style={{
          // minHeight: '100vh',
          flex: 1
        }}
      >
        <StatusBar barStyle="light-content" />
        <MainView beeId={beeId} isReduxStoreReady={isReduxStoreReady} />
        <AlertContainer />
      </View>
    );
  }
}
