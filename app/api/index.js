import Config from 'react-native-config';
import { get, post, put } from './apiService';
import { currentLocale } from '../locales/';
import { arrayToObjectById, arrayToIds } from '../utils/helpers';

const API_URL = Config.URL_BASE;
// key
exports.REJECT_CODE = 'reject_code';
exports.STATUS_ACTION = 'statusAction';
exports.REASON_TEXT = 'reason_text';
exports.ROLE = 'role';

// constant
const CLIENT_SECRET = Config.CLIENT_SECRET;
const CLIENT_ID = Config.CLIENT_ID;

const queryConstructor = queryStringObject =>
  Object.keys(queryStringObject)
    .map(queryString => `${queryString}=${queryStringObject[queryString]}`)
    .join('&');
