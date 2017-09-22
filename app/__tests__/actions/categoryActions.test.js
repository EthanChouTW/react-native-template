import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchProductsByCategories } from '../../actions/categoryActions';
import { APPEND_PRODUCTS_TO_CATEGORY, SET_PRODUCTS } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('department actions', () => {
  it('should create an action to append products to category, and create products', () => {
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
        type: APPEND_PRODUCTS_TO_CATEGORY
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
      categories: { byId: { 2: { id: 2, metaData: { current_page: 1, total_pages: 3 } } } }
    });

    return store.dispatch(fetchProductsByCategories(1, 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
