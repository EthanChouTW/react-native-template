import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { debounce } from 'lodash';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackArrowIcon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {
  searchProducts,
  clearSearchProducts,
  updateProductStatus
} from '../../../actions/productActions';
import Locales from '../../../locales';
import Theme from '../../../utils/styleCollection';
import InventoryList from '../InventoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.hbGray
  },
  statusBar: {
    height: 20,
    backgroundColor: Theme.hbYellow
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: Theme.hbYellow,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  searchContainer: {
    flex: 6,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchBarButton: {
    flex: 1,
    alignItems: 'center'
  },
  searchInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Theme.algaeGreenColor
  },
  emptyViewContainer: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  emptyViewTitle: {
    fontSize: 20,
    color: Theme.grayBackgroundColor,
    textAlign: 'center'
  },
  emptyViewBody: {
    fontSize: 16,
    color: Theme.grayBackgroundColor,
    textAlign: 'center',
    marginTop: 24
  },
  scrollView: {
    height: '100%'
  },
  indicator: {
    padding: 15
  }
});

const EmptyView = () => (
  <View style={styles.emptyViewContainer}>
    <Text style={styles.emptyViewTitle}>{Locales.t('msg_empty_search_title')}</Text>
    <Text style={styles.emptyViewBody}>{Locales.t('msg_empty_search_content')}</Text>
  </View>
);

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = {
  searchProducts,
  clearSearchProducts,
  updateProductStatus
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductSearchScreen extends Component {
  static propTypes = {
    products: PropTypes.shape({
      byId: PropTypes.object,
      Ids: PropTypes.array
    }),
    onPressHideButton: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isChangingStatus: false,
      changingProductId: null,
      searchString: '',
      data: []
    };
  }

  async componentDidMount() {
    this.searchFocus();
    await this.props.clearSearchProducts();
  }

  onRefresh = async () => {
    this.setState({
      isRefreshing: true
    });
    await this.props.searchProducts(this.state.searchString);
    await this.setState({
      data: this.props.products.searchProductsIds.map(
        id => this.props.products.searchProductsById[id]
      )
    });
    this.setState({
      isRefreshing: false
    });
  };

  onUpdateProductStatus = async productId => {
    await this.setState({
      isChangingStatus: true,
      changingProductId: productId
    });
    await this.props.updateProductStatus(productId);
    await this.setState({
      data: this.props.products.searchProductsIds.map(
        id => this.props.products.searchProductsById[id]
      ),
      isChangingStatus: false,
      changingProductId: null
    });
  };

  searchItem = async text => {
    if (!text.length) {
      await this.props.clearSearchProducts();
      this.setState({
        isRefreshing: false,
        data: []
      });
      return;
    }
    if (this.state.searchString === text) {
      this.onRefresh();
    }
  };

  handleSearch = async text => {
    await this.setState({
      searchString: text,
      isRefreshing: true
    });
    debounce(() => this.searchItem(text), 500)();
  };

  searchBlur = () => {
    this.search.blur();
  };

  searchClearText = () => {
    this.search.clearText();
  };

  searchFocus = () => {
    this.search.focus();
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.searchBarButton} onPress={this.props.onPressHideButton}>
            <BackArrowIcon name={'md-arrow-back'} size={24} color="black" />
          </TouchableOpacity>
          <SearchBar
            containerStyle={styles.searchContainer}
            inputStyle={styles.searchInput}
            ref={search => (this.search = search)}
            noIcon
            onChangeText={text => this.handleSearch(text)}
            selectionColor={Theme.algaeGreenColor}
          />
          <TouchableOpacity style={styles.searchBarButton} onPress={this.searchClearText}>
            <CloseIcon name={'close'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {this.state.isRefreshing && (
          <Animatable.View animation="fadeIn" duration={600}>
            <ActivityIndicator size="large" animating style={styles.indicator} />
          </Animatable.View>
        )}
        {!this.state.isRefreshing && data.length === 0 ? (
          <EmptyView />
        ) : (
          <InventoryList
            extraData={this.state}
            onUpdateProductStatus={id => this.onUpdateProductStatus(id)}
            isChangingStatus={this.state.isChangingStatus}
            changingProductId={this.state.changingProductId}
            data={this.state.data}
          />
        )}
      </View>
    );
  }
}
