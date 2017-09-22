import I18n from 'react-native-i18n';
import { APIVersionV2 } from './index';
import { UserException } from './exceptionHandler';

export const headers = apiVersion => {
  if (apiVersion === APIVersionV2) {
    return {
      Accept: 'application/vnd.honestbee+json;version=2',
      'Content-Type': 'application/json'
    };
  }
  return {
    'Content-Type': 'application/json'
  };
};

const responseHandler = async response => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:
      throw new UserException(response.status, '');
    default: {
      const { status } = await response.json();
      throw new UserException(status.code, status.message);
    }
  }
};

export const currentLocale = () => {
  I18n.fallbacks = true;
  const localeSplitter = I18n.currentLocale().split('-');
  let [locale] = [...localeSplitter];
  const [region] = [...localeSplitter].reverse();
  if (locale === 'zh' && localeSplitter.length > 1) {
    locale = `${locale}-${region}`;
  }
  return locale;
};

export const get = async (url, apiVersion) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: headers(apiVersion)
  });
  return responseHandler(response);
};

export const post = async (url, apiVersion, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: headers(apiVersion),
    body: JSON.stringify(body)
  });
  return responseHandler(response);
};

export const put = async (url, apiVersion, body) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: headers(apiVersion),
    body: JSON.stringify(body)
  });
  return responseHandler(response);
};
