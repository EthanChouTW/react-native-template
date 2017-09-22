import {
  SET_PRODUCTS,
  CHANGE_PRODUCT_STATUS,
  SET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS
} from './actionTypes';
import { updateProductStatusApi, searchProductsApi } from '../api';
import { dataHandler } from '../api/dataHandler';
import { normalizedElements } from '../utils/helpers';

export const PRODUCT_STATUS_AVAILABLE = 'status_available';
export const PRODUCT_STATUS_OUT_OF_STOCK = 'status_out_of_stock';

const setNewProducts = normalizedProducts => ({
  type: SET_PRODUCTS,
  payload: normalizedProducts
});

const changeProductStatus = (productId, productStatus) => ({
  type: CHANGE_PRODUCT_STATUS,
  payload: {
    productId,
    productStatus
  }
});

const setSearchProducts = normalizedProducts => ({
  type: SET_SEARCH_PRODUCTS,
  payload: normalizedProducts
});

const clearAllSearchProducts = () => ({
  type: CLEAR_SEARCH_PRODUCTS
});

export const setProducts = (dispatch, products) => {
  dispatch(setNewProducts(products));
};

export const updateProductStatus = productId => async (dispatch, getState) => {
  const { branches, products } = getState();
  const accessToken = getState().auth.accessToken;
  const storeId = branches.branchSelectedId;
  const product = products.byId[productId];
  const productStatus =
    product.status === PRODUCT_STATUS_AVAILABLE
      ? PRODUCT_STATUS_OUT_OF_STOCK
      : PRODUCT_STATUS_AVAILABLE;
  await dataHandler(dispatch, async () => {
    await updateProductStatusApi(storeId, product.id, productStatus, accessToken);
    await dispatch(changeProductStatus(productId, productStatus));
  });
};

export const searchProducts = queryString => async (dispatch, getState) => {
  const storeId = getState().store.id;
  if (storeId === undefined) {
    return;
  }
  const brand = getState().branches.byId[storeId].brandId;
  await dataHandler(dispatch, async () => {
    const response = await searchProductsApi(brand, storeId, queryString);

    const normalizedProducts = normalizedElements(response);
    await dispatch(setSearchProducts(normalizedProducts));
  });
};

export const clearSearchProducts = () => async dispatch => {
  dispatch(clearAllSearchProducts());
};
