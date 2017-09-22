import I18n from 'react-native-i18n';
import en from './en.json';
import zh_TW from './zh-TW.json';
import zh_HK from './zh-HK.json';
import zh from './zh.json';
import ja from './ja.json';
import id from './id.json';
import th from './th.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
  'zh-Hant-TW': zh_TW, // for ios
  'zh-TW': zh_TW, // for android
  'zh-Hant-HK': zh_HK,
  'zh-HK': zh_HK,
  ja,
  id,
  th
};

export const currentLocale = () => {
  const localeSplitter = I18n.currentLocale().split('-');
  let [locale] = [...localeSplitter];
  const [region] = [...localeSplitter].reverse();
  if (locale === 'zh') {
    locale = `${locale}-${region}`;
  }
  return locale;
};

export const currencyPrice = (price, currency) => {
  const num = Number(price);
  if (currency === undefined) return num;

  if (!global.Intl) {
    return `$${num}`;
  }

  const formatter = new Intl.NumberFormat(I18n.currentLocale(), {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  });
  return formatter.format(num);
};

export default I18n;
