import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setSelectedBranch, clearBranch, getBranchList } from '../../actions/branchesActions';
import { SET_SELECTED_BRANCH, CLEAR_BRANCH, SET_BRANCHES } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('branches actions', () => {
  it('should create an action to set selected branch', () => {
    const id = 1;
    const name = 'name';
    const expectedAction = {
      type: SET_SELECTED_BRANCH,
      branchSelectedId: id,
      branchSelectedName: name
    };
    expect(setSelectedBranch(id, name)).toEqual(expectedAction);
  });

  it('should create an action to clear branch', () => {
    const expectedAction = {
      type: CLEAR_BRANCH
    };
    expect(clearBranch()).toEqual(expectedAction);
  });

  it('should create SET_BRANCHES when get branch list', () => {
    const mockResponse = [{ id: 1, name: '1' }, { id: 2, name: '2' }];
    fetch.mockResponse(JSON.stringify(mockResponse));
    const expectedActions = [
      {
        type: SET_BRANCHES,
        byId: { 1: { id: 1, name: '1' }, 2: { id: 2, name: '2' } },
        Ids: [1, 2]
      }
    ];

    const store = mockStore({ auth: { beeId: '', access_token: '', firebaseEndpoint: '', firebaseCustomToken: '' } });
    return store.dispatch(getBranchList()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
