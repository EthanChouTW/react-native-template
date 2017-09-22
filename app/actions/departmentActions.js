import { fetchDepartmentsApi, fetchProductsByDepartmentApi } from '../api';
import { dataHandler } from '../api/dataHandler';
import { SET_DEPAERTMENTS, APPEND_PRODUCTS_TO_DEPARTMENT } from './actionTypes';
import {
  normalizedElements,
  arrayToObjectById,
  arrayToIds
} from '../utils/helpers';
import { setCategories } from './categoryActions';
import { setProducts } from './productActions';

const setDepartments = normalizedDepartments => ({
  type: SET_DEPAERTMENTS,
  payload: normalizedDepartments
});

const getCategoriesFromDepartments = (dispatch, departments) => {
  departments.forEach(department => {
    const normalizedCategories = normalizedElements(department.categories);
    dispatch(setCategories(normalizedCategories));
  }, this);
};

const appendProductsToDepartment = (departmentId, productIds, metaData) => ({
  type: APPEND_PRODUCTS_TO_DEPARTMENT,
  payload: {
    id: departmentId,
    productIds,
    metaData
  }
});

export const ALL_CATEGORIES_ID = 0;

export const fetchDepartments = () => async (dispatch, getState) => {
  const storeId = getState().branches.branchSelectedId;
  await dataHandler(dispatch, async () => {
    const response = await fetchDepartmentsApi(storeId);
    const departments = response.departments;
    const normalizedDepartments = normalizedElements(departments);
    await dispatch(setDepartments(normalizedDepartments));
    getCategoriesFromDepartments(dispatch, departments);
  });
};

export const fetchProductsByDepartment = departmentId => async (
  dispatch,
  getState
) => {
  const department = getState().departments.byId[departmentId];

  const page = department.metaData ? department.metaData.current_page + 1 : 1;
  await dataHandler(dispatch, async () => {
    const response = await fetchProductsByDepartmentApi(departmentId, page);
    const products = response.products;
    const productIds = arrayToIds(products);
    dispatch(
      appendProductsToDepartment(departmentId, productIds, response.meta)
    );
    const normalizedProducts = { byId: arrayToObjectById(response.products) };

    setProducts(dispatch, normalizedProducts);
  });
};
