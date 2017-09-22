import { currentLocale } from '../../api/apiService';

const mocki18n = require('react-native-i18n');

describe('apiService function test', () => {
  it('should return en', () => {
    mocki18n.currentLocale = () => 'en';

    expect(currentLocale()).toEqual('en');
  });

  it('should return zh', () => {
    mocki18n.currentLocale = () => 'zh';

    expect(currentLocale()).toEqual('zh');
  });

  it('should return zh-TW', () => {
    mocki18n.currentLocale = () => 'zh-Hant-TW';

    expect(currentLocale()).toEqual('zh-TW');
  });

  it('should return zh-HK', () => {
    mocki18n.currentLocale = () => 'zh-Hant-HK';

    expect(currentLocale()).toEqual('zh-HK');
  });

  it('should return ja', () => {
    mocki18n.currentLocale = () => 'ja-JP';

    expect(currentLocale()).toEqual('ja');
  });

  it('should return id', () => {
    mocki18n.currentLocale = () => 'id-ID';

    expect(currentLocale()).toEqual('id');
  });

  it('should return th', () => {
    mocki18n.currentLocale = () => 'th-TH';

    expect(currentLocale()).toEqual('th');
  });
});
