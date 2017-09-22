import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import IconForMenuDown from 'react-native-vector-icons/MaterialCommunityIcons';
import IconForMenu from 'react-native-vector-icons/FontAwesome';
import IconForCheck from 'react-native-vector-icons/Entypo';
import Locales from '../locales/';
import Theme from '../utils/styleCollection';

const styles = StyleSheet.create({
  categorySelector: {
    height: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderColor: Theme.hbGray
  },
  menuContainer: {
    maxHeight: 300
  },
  menuRowContainer: {
    padding: 16,
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: Theme.hbGray,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  dropdownText: {
    fontSize: 16
  },
  menuIcon: {
    padding: 10
  },
  menuIconText: {
    paddingVertical: 10
  },
  menuDownIcon: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  checkIcon: {
    color: Theme.hbYellow,
    fontSize: 20,
    paddingRight: 10
  },
  emptyCheck: {
    paddingRight: 30
  }
});

const mapStateToProps = state => ({
  categories: state.categories
});

@connect(mapStateToProps)
export default class CategoryMenuComponent extends Component {
  static propTypes = {
    categories: PropTypes.shape({
      byId: PropTypes.object,
      Ids: PropTypes.array
    }),
    onSelectCategory: PropTypes.func,
    onCheckIfNoStore: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowCategoryMenu: false,
      selectedCategoryId: 0
    };
  }

  onCheckIfNeedToggleMenu = () => {
    if (!this.props.onCheckIfNoStore()) {
      this.toggleCategoryMenu();
    }
  };

  onSelectCategory = id => {
    this.setState({
      selectedCategoryId: id
    });
    this.props.onSelectCategory(id);
  };
  toggleCategoryMenu = () => {
    this.setState({
      isShowCategoryMenu: !this.state.isShowCategoryMenu
    });
  };

  renderCategoryIcon = id =>
    (this.state.selectedCategoryId === id ? (
      <IconForCheck name="check" style={styles.checkIcon} />
    ) : (
      <View style={styles.emptyCheck} />
    ));

  render() {
    const { byId, Ids } = this.props.categories;
    return (
      <View>
        <TouchableOpacity style={styles.categorySelector} onPress={this.onCheckIfNeedToggleMenu}>
          <IconForMenu
            style={styles.menuIcon}
            name="th-list"
            size={16}
            color={Theme.algaeGreenColor}
          />
          <Text style={styles.menuIconText}>{Locales.t('categories')}</Text>
          <View style={styles.menuDownIcon}>
            <IconForMenuDown name="menu-down" size={16} />
          </View>
        </TouchableOpacity>
        {this.state.isShowCategoryMenu &&
        Ids !== undefined && (
          <ScrollView style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => {
                this.onSelectCategory(0);
                this.toggleCategoryMenu();
              }}
            >
              <View style={styles.menuRowContainer}>
                {this.renderCategoryIcon(0)}
                <Text style={styles.dropdownText}>{Locales.t('all')}</Text>
              </View>
            </TouchableOpacity>
            {Ids.map(id => (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  // set current product type
                  this.onSelectCategory(id);
                  this.toggleCategoryMenu();
                }}
              >
                <View style={styles.menuRowContainer}>
                  {this.renderCategoryIcon(id)}
                  <Text style={styles.dropdownText}>{byId[id].title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}
