import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchDepartments, fetchProductsByDepartment } from '../../actions/departmentActions';
import { SET_DEPAERTMENTS, SET_CATEGORIES, APPEND_PRODUCTS_TO_DEPARTMENT, SET_PRODUCTS } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('department actions', () => {
  it('should create an action to set department and category', () => {
    const mockResponse = {
      departments: [{
        id: 123,
        categories: [{
          id: 345
        }]
      }]
    };
    const expectedActions = [{
      payload: {
        Ids: [123],
        byId: { 123: { categories: [{ id: 345 }], id: 123 } }
      },
      type: SET_DEPAERTMENTS
    },
    {
      payload: {
        Ids: [345],
        byId: { 345: { id: 345 } }
      },
      type: SET_CATEGORIES
    }];
    fetch.mockResponse(JSON.stringify(mockResponse));
    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1 }
    });

    return store.dispatch(fetchDepartments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should create an action to append products to department, and create products', () => {
    const mockResponse = {
      products: [
        {
          id: 123,
          title: 'enen',
          price: '30'
        }
      ],
      meta: {}
    };
    const expectedActions = [
      {
        payload: {
          id: 2,
          metaData: {},
          productIds: [
            123
          ]
        },
        type: APPEND_PRODUCTS_TO_DEPARTMENT
      },
      {
        payload: {
          byId: {
            123: {
              id: 123,
              price: '30',
              title: 'enen'
            }
          }
        },
        type: SET_PRODUCTS
      }
    ];

    fetch.mockResponse(JSON.stringify(mockResponse));
    const store = mockStore({
      auth: { accessToken: '' },
      branches: { branchSelectedId: 1829 },
      departments: { byId: { 2: { id: 2, metaData: { current_page: 1, total_pages: 3 } } } }
    });

    return store.dispatch(fetchProductsByDepartment(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
