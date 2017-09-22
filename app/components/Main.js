import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { drawerRoutes, drawerConfig } from '../routes/drawerRoutes';

const mapStateToProps = state => ({
  nav: state.nav,
  // user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.shape({
      route: PropTypes.object,
      index: PropTypes.number
    }),
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      imageUrl: PropTypes.string
    })
  };

  render() {
    return (
      <MainNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
        screenProps={{ user: { imageUrl: '123', email: '123123', name: 'ethan'}}}
      />
    );
  }
}

export const MainNavigator = DrawerNavigator(drawerRoutes, drawerConfig);
