import Moment from 'moment';
import 'moment/locale/zh-tw';
import { currentLocale } from '../locales';

export const getDateMonth = dateString => {
  Moment.locale(currentLocale().toLowerCase());
  return Moment(dateString).format('DD MMM');
};

export const getFullDate = (dateString) => {
  Moment.locale(currentLocale().toLowerCase());
  return Moment(dateString).format('LL');
};

export const getTime = (dateString) => {
  Moment.locale(currentLocale().toLowerCase());
  return Moment(dateString).format('h:mm A');
};

export const getDateTime = dateString => {
  Moment.locale(currentLocale().toLowerCase());
  return Moment(dateString).format('DD MMM h:mm A');
};
