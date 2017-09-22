import { fetchProductsByCategoriesApi } from '../api';
import { SET_CATEGORIES, APPEND_PRODUCTS_TO_CATEGORY } from './actionTypes';
import { arrayToObjectById, arrayToIds } from '../utils/helpers';
import { setProducts } from './productActions';
import { dataHandler } from '../api/dataHandler';

const appendProductsToCategory = (categoryId, productIds, metaData) => ({
  type: APPEND_PRODUCTS_TO_CATEGORY,
  payload: {
    id: categoryId,
    productIds,
    metaData
  }
});

export const setCategories = normalizedCategories => ({
  type: SET_CATEGORIES,
  payload: normalizedCategories
});

export const fetchProductsByCategories = (departmentId, categoryId) => async (
  dispatch,
  getState
) => {
  const category = getState().categories.byId[categoryId];
  const page = category.metaData ? category.metaData.currentPage + 1 : 1;
  const storeId = getState().branches.branchSelectedId;
  const statuses =
    'status_out_of_stock%2Cstatus_likely_out_of_stock%2Cstatus_available';
  const sortType = 'price';
  await dataHandler(dispatch, async () => {
    const response = await fetchProductsByCategoriesApi(
      departmentId,
      categoryId,
      sortType,
      statuses,
      storeId,
      page
    );
    const productIds = arrayToIds(response.products);
    dispatch(appendProductsToCategory(categoryId, productIds, response.meta));
    const normalizedProducts = { byId: arrayToObjectById(response.products) };
    setProducts(dispatch, normalizedProducts);
  });
};
