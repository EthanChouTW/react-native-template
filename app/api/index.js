import Config from 'react-native-config';
import { get, post, put } from './apiService';
import { currentLocale } from '../locales/';
import { arrayToObjectById, arrayToIds } from '../utils/helpers';

const API_URL = Config.URL_BASE;
const SHOPPER = 'shopper';
export const APIVersionV2 = 'v2';
const APIVersionV1 = 'v1';
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

export const fetchBranchListApi = async (beeId, accessToken) => {
  const response = await get(
    `${API_URL}/api/bees/${beeId}/stores?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV2
  );
  return {
    byId: arrayToObjectById(response),
    Ids: arrayToIds(response)
  };
};

export const getOrderFulfillmentsApi = async (
  storeId,
  accessToken,
  statuses,
  page,
  fulfillmentStatuses
) => {
  const response = await get(
    `${API_URL}/api/stores/${storeId}/order_fulfillments?${queryConstructor({
      access_token: accessToken,
      status: statuses,
      page,
      role: SHOPPER,
      fulfillment_status: fulfillmentStatuses,
      locale: currentLocale()
    })}`,
    APIVersionV2
  );
  const filteredRes = response.filter(orderFulfillment => orderFulfillment.store.id === storeId);
  return {
    byId: arrayToObjectById(filteredRes),
    Ids: arrayToIds(filteredRes)
  };
};

export const fetchJobHistoryApi = async (page, accessToken) => {
  const response = await get(
    `${API_URL}/api/order_fulfillments?${queryConstructor({
      sorting: 'desc',
      status: 'handed_over',
      role: 'shopper',
      page,
      access_token: accessToken,
      locale: currentLocale()
    })}`,
    APIVersionV1
  );
  return response;
};

export const changeOrderFulfillmentsStatus = async (fulfillmentId, accessToken, statusBody) => {
  const response = await post(
    `${API_URL}/api/order_fulfillments/${fulfillmentId}/status?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV1,
    statusBody
  );
  return response;
};

export const getRejectReasonApi = async accessToken => {
  const response = await get(
    `${API_URL}/api/order_fulfillments/reject_reasons?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV1
  );
  return response;
};

export const loginUserApi = async (email, password) => {
  const response = await post(`${API_URL}/api/account/token`, APIVersionV2, {
    username: email,
    password,
    grant_type: 'password',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    fields: 'bee_context'
  });
  return response;
};

export const logoutUserApi = async accessToken => {
  const response = await post(`${API_URL}/api/account/revoke`, APIVersionV1, {
    access_token: accessToken,
    token: accessToken
  });
  return response;
};

export const fetchDepartmentsApi = async storeId => {
  const response = await get(
    `${API_URL}/api/stores/${storeId}/directory?${queryConstructor({
      locale: currentLocale()
    })}`,
    APIVersionV2
  );
  return response;
};

export const fetchProductsByCategoriesApi = async (
  departmentId,
  categoryId,
  sortType,
  productStatus,
  storeId,
  page
) => {
  const response = await get(
    `${API_URL}/api/departments/${departmentId}?${queryConstructor({
      sort: sortType,
      status: productStatus,
      store_id: storeId,
      page,
      'categoryIds%5B%5D': categoryId,
      locale: currentLocale()
    })}`,
    APIVersionV2
  );
  return response;
};

export const fetchProductsByDepartmentApi = async (departmentId, page) => {
  const response = await get(
    `${API_URL}/api/departments/${departmentId}?${queryConstructor({
      page,
      locale: currentLocale()
    })}`,
    APIVersionV2
  );
  return response;
};

export const getStoreDetailApi = async (storeId, accessToken) => {
  const response = await get(
    `${API_URL}/api/stores/${storeId}?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV1
  );
  return response;
};

export const updateProductStatusApi = async (storeId, productId, productStatus, accessToken) => {
  const response = await put(
    `${API_URL}/api/products/${productId}/store_inventory?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV2,
    {
      storeId,
      stock_status: productStatus
    }
  );
  return response;
};

export const searchProductsApi = async (brand, storeId, q) => {
  const response = await get(
    `${API_URL}/api/product/auto_search?${queryConstructor({
      brand,
      storeId,
      q
    })}`,
    APIVersionV1
  );
  return response;
};

export const updateBufferTimeApi = async (storeId, accessToken, body) => {
  const response = await put(
    `${API_URL}/api/stores/${storeId}?${queryConstructor({
      access_token: `${accessToken}`,
      locale: currentLocale()
    })}`,
    APIVersionV1,
    body
  );
  return response;
};

export const updateStoreOpenStatusApi = async (storeId, accessToken, body) => {
  const response = await put(
    `${API_URL}/api/stores/${storeId}/temporarily_closed?${queryConstructor({
      access_token: `${accessToken}`
    })}`,
    APIVersionV2,
    body
  );
  return response;
};

export const syncFulfillmentItemsApi = async (accessToken, orderFulfillmentId) => {
  const response = await post(
    `${API_URL}/api/order_fulfillments/${orderFulfillmentId}/sync_fulfilled_items?${
      queryConstructor(
        {
          access_token: `${accessToken}`,
          locale: currentLocale()
        }
    )}`,
    APIVersionV2,
    {}
  );
  return response;
};
