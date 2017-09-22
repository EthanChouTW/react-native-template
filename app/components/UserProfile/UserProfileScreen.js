import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import UserProfileMenuComponent from './UserProfileMenuComponent';
import { getBranchList } from '../../actions/branchesActions';
import { DRAWER_OPEN } from '../../utils/appConstants';
import NavigationBar from '../../components/NavigationBar';
import Locales from '../../locales/index';
import Theme from '../../utils/styleCollection';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbGray
  },

  barContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Theme.hbYellow
  },
  listContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 14
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    margin: 3
  },
  listSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.hbGray,
    padding: 16
  },
  nameText: {
    fontSize: 16,
    color: 'black'
  },
  serviceText: {
    fontSize: 16,
    color: Theme.hbTextGray
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Theme.hbGray
  },
  navBarTitle: {
    color: 'black',
    fontSize: 20,
    paddingLeft: 16
  }
});

const mapStateToProps = state => ({
  branches: state.branches,
  user: state.auth.user
});

const mapDispatchToProps = {
  getBranchList
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfileScreen extends Component {
  static navigationOptions = ({ screenProps }) => {
    const { imageUrl, email, name } = screenProps.user;
    return {
      drawerLabel: (
        <UserProfileMenuComponent imageUrl={'hellooo'} email={'123'} name={'ethan'} isInSlideMenu />
      )
    };
  };

  static propTypes = {
  };

  constructor(props) {
    super(props);
   
  }


  onPressLeftBarButton = () => {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate(DRAWER_OPEN);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('dashboard_screen_title')}
          onIconPress={this.onPressLeftBarButton}
          iconName={'menu'}
        />
       
      </View>
    );
  }
}
