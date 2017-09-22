import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, SectionList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NavigationBar from './NavigationBar';
import { toggleAutoPrint } from '../actions/printerActions';
import Locales from '../locales/index';
import Theme from '../utils/styleCollection';

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
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 4
  },
  listSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.hbGray,
    padding: 16
  },
  printerContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 4
  },
  changePrinterTextWithPrinter: {
    color: Theme.algaeGreenColor
  },
  changePrinterTextWithoutPrinter: {
    color: Theme.hbRed
  },
  nameText: {
    fontSize: 16,
    color: 'black'
  },
  addressText: {
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
  printer: state.printer
});

const mapDispatchToProps = {
  toggleAutoPrint
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PrinterSettingScreen extends Component {
  static propTypes = {
    onPressHideButton: PropTypes.func,
    toggleAutoPrint: PropTypes.func,
    printer: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string,
      isAutoPrint: PropTypes.bool
    }),
    onPressPrinterSelection: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPrinterSelection: false,
      isAutoPrint: false,
      listData: [this.getAutoPrint(false), this.getPrinterStatus()]
    };
  }

  getAutoPrint = isAutoPrint => ({
    title: Locales.t('setting_title_auto_print_order'),
    data: [
      {
        title: Locales.t('setting_sub_title_auto_print_order'),
        isAutoPrint
      }
    ]
  });

  getPrinterStatus = () => {
    const { name, address } = this.props.printer;
    return {
      title: Locales.t('setting_title_printer_connection_status'),
      data: [
        {
          name,
          address
        }
      ]
    };
  };

  handleAutoPrintSwitch = () => {
    this.props.toggleAutoPrint();
  };

  handleChangePrinter = () => {
    this.props.onPressPrinterSelection();
  };

  renderItem = element => {
    if (element.section.title === Locales.t('setting_title_auto_print_order')) {
      return (
        <View key={element.item.id} style={styles.listItemContainer}>
          <Text style={styles.nameText}>{element.item.title}</Text>
          <Switch
            onValueChange={this.handleAutoPrintSwitch}
            value={this.props.printer.isAutoPrint}
          />
        </View>
      );
    }

    return (
      <View key={element.item.id} style={styles.printerContainer}>
        <Text style={styles.nameText}>{element.item.name.length ? element.item.name : '--'}</Text>
        <Text style={styles.addressText}>
          {element.item.address.length ? element.item.address : '--'}
        </Text>
        <TouchableOpacity onPress={this.handleChangePrinter}>
          <Text
            style={
              element.item.name.length ? (
                styles.changePrinterTextWithPrinter
              ) : (
                styles.changePrinterTextWithoutPrinter
              )
            }
          >
            {Locales.t('change_printer')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderSectionHeader = ({ section }) => (
    <View style={styles.listSectionContainer}>
      <Text style={styles.nameText}>{section.title}</Text>
    </View>
  );

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={Locales.t('ab_title_printer_setting')}
          onIconPress={this.props.onPressHideButton}
        />
        <SectionList
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.listData}
          keyExtractor={element => element.id}
        />
      </View>
    );
  }
}
