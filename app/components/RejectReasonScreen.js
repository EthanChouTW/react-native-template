import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { rejectOrderFulfillments, getRejectReason } from '../actions/orderFulfillmentsActions';
import NavigationBar from './NavigationBar';
import Locales from '../locales';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  rowContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken
});

const mapDispatchToProps = {
  rejectOrderFulfillments,
  getRejectReason
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RejectReasonScreeen extends Component {
  static propTypes = {
    rejectOrderFulfillments: PropTypes.func,
    getRejectReason: PropTypes.func,
    orderFulfillmentId: PropTypes.number,
    pressHideButton: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      reasons: {}
    };

    this.props.getRejectReason().then((reasons) => {
      this.setState({ refreshing: false, reasons });
    });
  }

  rejectOrder(reasonCode, reasonText) {
    const { orderFulfillmentId } = this.props;
    this.props.rejectOrderFulfillments(orderFulfillmentId, reasonCode, reasonText).then(() => {
      this.props.pressHideButton();
    });
  }
  render() {
    const reasonCodes = Object.keys(this.state.reasons);
    const renderReasonList = () => reasonCodes.map(reasonCode => (
      <TouchableOpacity
        key={reasonCode}
        onPress={() => {
          this.rejectOrder(reasonCode, this.state.reasons[`${reasonCode}`]);
        }}
      >
        <View style={styles.rowContainer}>
          <Text>{this.state.reasons[reasonCode]}</Text>
        </View>
      </TouchableOpacity>

        ));
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('merchant_reject_no_reason')}
          onIconPress={this.props.pressHideButton}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
                    }
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {renderReasonList()}
        </ScrollView>
      </View>
    );
  }
}

