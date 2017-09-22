import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  updateProductStatus,
  searchProducts,
  clearSearchProducts
} from '../../actions/productActions';
import {
  CHANGE_PRODUCT_STATUS,
  SET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS
} from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('product actions', () => {
  it('should change product status, available', () => {
    const mockResponse = {
      ok: true
    };
    const expectedActions = [
      {
        payload: {
          productId: 2,
          productStatus: 'status_out_of_stock'
        },
        type: CHANGE_PRODUCT_STATUS
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));
    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1829 },
      products: {
        byId: { 2: { id: 2, status: 'status_available' } },
        searchProductById: { 2: { id: 2, status: 'status_available' } },
        searchProductIds: [2]
      }
    });

    return store.dispatch(updateProductStatus(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should change product status, available', () => {
    const mockResponse = {
      ok: true
    };
    const expectedActions = [
      {
        payload: {
          productId: 2,
          productStatus: 'status_available'
        },
        type: CHANGE_PRODUCT_STATUS
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));
    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1829 },
      products: {
        byId: { 2: { id: 2, status: 'status_out_of_stock' } },
        searchProductById: { 2: { id: 2, status: 'status_out_of_stock' } },
        searchProductIds: [2]
      }
    });

    return store.dispatch(updateProductStatus(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('no store should not perform search product', () => {
    const expectedActions = [];

    const store = mockStore({
      store: { id: undefined }

    });

    return store.dispatch(searchProducts('enen')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should perform search product', () => {
    const mockResponse = [
      {
        id: 123,
        title: 'enen',
        price: '30'
      }
    ];
    const expectedActions = [
      {
        payload: {
          byId: {
            123: {
              id: 123,
              title: 'enen',
              price: '30'
            }
          },
          Ids: [123]
        },
        type: SET_SEARCH_PRODUCTS
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));
    const store = mockStore({
      store: { id: 1 },
      branches: { branchSelectedId: 1829, byId: { 1: { id: 1, brandId: 333 } } },
      products: {
        byId: {},
        searchProductsById: {},
        searchProductsIds: []
      }
    });

    return store.dispatch(searchProducts('enen')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should clear search product', () => {
    const expectedActions = [
      {
        type: CLEAR_SEARCH_PRODUCTS
      }
    ];

    const store = mockStore({});

    return store.dispatch(clearSearchProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
