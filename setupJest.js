import 'isomorphic-fetch';

global.fetch = require('jest-fetch-mock');

const I18nMock = jest.mock('react-native-i18n', () => ({
  t: jest.fn(translation => translation),
  currentLocale: jest.fn(() => 'en')
}));
global.I18n = I18nMock;

const viewPagerMock = jest.mock('rn-viewpager', () => {});
global.ViewPager = viewPagerMock;

const NativeModulesMock = jest.mock('NativeModules', () => ({
  ParseModule: {
    updateParseInstallation: jest.fn(),
    unSubscribeAllParseChannels: jest.fn()
  }
}));
global.NativeModules = NativeModulesMock;

const NativeEventEmitterMock = jest.mock('NativeEventEmitter', () => class MockNativeEventEmitter {
  addListener = () => jest.fn();
  removeListener = () => jest.fn();
  removeAllListeners = () => jest.fn();
  });

global.NativeEventEmitter = NativeEventEmitterMock;
