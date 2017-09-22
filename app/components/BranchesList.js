import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { getBranchList, setSelectedBranch } from '../actions/branchesActions';
import StyleCollection from '../utils/styleCollection';
import NavigationBar from './NavigationBar';
import { DRAWER_OPEN } from '../utils/appConstants';
import { getStoreDetail } from '../actions/storeActions';
import Locales from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  branchRowContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuContainer: {
    padding: 15,
    backgroundColor: 'white'
  },
  menuTitle: {
    fontSize: 12
  },
  menuSelection: {
    flexDirection: 'row'
  },
  menu: {
    flexGrow: 1,
    padding: 8,
    borderBottomWidth: 1
  },
  menuOptionText: {
    fontSize: 20,
    paddingVertical: 5
  },
  dropdownIcon: {
    paddingTop: 10
  },
  dropdownMenu: {
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1
  },
  dropdownMenuText: {
    color: '#000',
    fontSize: 16
  },
  confirmButtonContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15
  },
  confirmButton: {
    backgroundColor: StyleCollection.algaeGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1
  },
  confirmButtonTitle: {
    color: StyleCollection.whiteColor
  }
});

const mapStateToProps = state => ({
  branches: state.branches,
  beeId: state.auth.beeId,
  accessToken: state.auth.accessToken,
  nav: state.nav
});

const mapDispatchToProps = {
  getBranchList,
  setSelectedBranch,
  getStoreDetail
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BranchesList extends Component {
  static propTypes = {
    getBranchList: PropTypes.func,
    setSelectedBranch: PropTypes.func,
    branches: PropTypes.shape({
      byId: PropTypes.object,
      Ids: PropTypes.arrayOf(
        PropTypes.number,
      ).isRequired
    }),
    getStoreDetail: PropTypes.func,
    pressHideButton: PropTypes.func,
    navigation: PropTypes.shape({
      route: PropTypes.object,
      index: PropTypes.number
    }),
    accessToken: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isShowDropdownMenu: false
    };
    this.props.getBranchList().then(() => {
      this.setState({ refreshing: false });
    });
  }

  onPressLeftBarButton = () => {
    const { navigation, pressHideButton } = this.props;
    if (navigation) {
      navigation.navigate(DRAWER_OPEN);
    } else {
      pressHideButton();
    }
  };

  toggleDropdownMenu = () => {
    this.setState({
      isShowDropdownMenu: !this.state.isShowDropdownMenu
    });
  };

  render() {
    const { branches } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('partner_profile_choose_store')}
          onIconPress={this.onPressLeftBarButton}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>
              {Locales.t('partner_profile_choose_store')}
            </Text>
            <TouchableOpacity
              onPress={this.toggleDropdownMenu}
              style={styles.menuSelection}
            >
              <View style={styles.menu}>
                <Text style={styles.menuOptionText}>
                  {branches.branchSelectedName
                    ? branches.branchSelectedName
                    : ''}
                </Text>
              </View>
              <Icon
                style={styles.dropdownIcon}
                name="md-arrow-dropdown"
                size={20}
                color="black"
              />
            </TouchableOpacity>
            {this.state.isShowDropdownMenu &&
              <Animatable.View
                style={styles.dropdownMenu}
                animation="fadeIn"
                duration={600}
              >
                  {branches.Ids.map(id =>
                    (<TouchableOpacity
                      key={id}
                      onPress={() => {
                        this.props.setSelectedBranch(id, branches.byId[id].name);
                        this.props.getStoreDetail(id, this.props.accessToken);
                        this.toggleDropdownMenu();
                      }}
                    >
                      <View style={styles.branchRowContainer}>
                        <Text style={styles.dropdownMenuText}>
                          {branches.byId[id].name}
                          {console.log(`branch name: ${branches.byId[id].name}`)}
                        </Text>
                      </View>
                    </TouchableOpacity>)
                  )}
              </Animatable.View>}
          </View>
        </View>

        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              this.onPressLeftBarButton();
            }}
          >
            <Text style={styles.confirmButtonTitle}>
              {Locales.t('lbl_confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
