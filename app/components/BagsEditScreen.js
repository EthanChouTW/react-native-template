import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { updatedFulfillment } from '../actions/fulfillmentsActions';
import Theme from '../utils/styleCollection';
import Locales from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Theme.hbTransparentBlack
  },
  BagsContainer: {
    marginHorizontal: 30,
    padding: 15,
    height: 200,
    borderRadius: 5,
    backgroundColor: Theme.whiteColor
  },
  itemTitle: {
    flex: 1.5,
    justifyContent: 'center'
  },
  itemTitleText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  bagEditContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  editNumberButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'black'
  },
  editNumberButtonTitle: {
    color: Theme.algaeGreenColor,
    fontSize: 30
  },
  number: {
    color: 'black',
    fontSize: 20
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButton: {
    marginTop: 5,
    padding: 5,
    alignItems: 'flex-end'
  },
  actionButtonText: {
    color: Theme.algaeGreenColor
  }
});

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = {
  updatedFulfillment
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BagsEditScreen extends Component {
  static propTypes = {
    updatedFulfillment: PropTypes.func,
    onDismissView: PropTypes.func,
    orderFulfillmentId: PropTypes.number,
    fulfillment: PropTypes.shape({
      numberOfBags: PropTypes.number
    })
  };
  constructor(props) {
    super(props);
    const { fulfillment } = this.props;
    this.state = {
      currentNumberOfBags: fulfillment.numberOfBags ? fulfillment.numberOfBags : 0
    };
  }
  onDecreaseNumber = () => {
    if (this.state.currentNumberOfBags === 0) {
      return;
    }
    this.setState({
      currentNumberOfBags: this.state.currentNumberOfBags - 1
    });
  };

  onIncreaseNumber = () => {
    this.setState({
      currentNumberOfBags: this.state.currentNumberOfBags + 1
    });
  };
  updateFulfillment = () => {
    const { orderFulfillmentId, fulfillment } = this.props;
    const newFulfillment = fulfillment;
    newFulfillment.numberOfBags = this.state.currentNumberOfBags;
    this.props.updatedFulfillment(orderFulfillmentId, newFulfillment);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ flex: 1 }} />
        <View style={styles.BagsContainer}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitleText}>
              {Locales.t('title_how_many_bags')}
            </Text>
          </View>
          <View style={styles.bagEditContainer}>
            <TouchableOpacity
              style={styles.editNumberButton}
              onPress={this.onDecreaseNumber}
            >
              <Text style={styles.editNumberButtonTitle}>-</Text>
            </TouchableOpacity>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>
                {this.state.currentNumberOfBags}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editNumberButton}
              onPress={this.onIncreaseNumber}
            >
              <Text style={styles.editNumberButtonTitle}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                this.props.onDismissView();
              }}
            >
              <Text style={styles.actionButtonText}>
                {Locales.t('lbl_cancel').toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                await this.updateFulfillment();
                this.props.onDismissView();
              }}
            >
              <Text style={styles.actionButtonText}>
                {Locales.t('lbl_confirm').toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
    );
  }
}
