import { SET_BRANCHES, SET_SELECTED_BRANCH, CLEAR_BRANCH } from '../../actions/actionTypes';
import reducer from '../../reducer/branchesReducer';

describe('Branches reducer', () => {
  const defaultState = {
    byId: {},
    Ids: [],
    branchSelectedId: undefined,
    branchSelectedName: undefined
  };

  const endState = {
    byId: { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } },
    Ids: [1, 2, 3],
    branchSelectedId: 1,
    branchSelectedName: 'one'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle SET_BRANCHES', () => {
    expect(
      reducer(defaultState, {
        type: SET_BRANCHES,
        byId: { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } },
        Ids: [1, 2, 3]
      })
    ).toEqual({
      ...endState,
      branchSelectedId: undefined,
      branchSelectedName: undefined
    });
  });

  it('should handle SET_SELECTED_BRANCH', () => {
    expect(
      reducer(endState, {
        type: SET_SELECTED_BRANCH,
        branchSelectedId: 1,
        branchSelectedName: 'one'
      })
    ).toEqual({
      ...endState,
      branchSelectedId: 1,
      branchSelectedName: 'one'
    });
  });

  it('should clear branches', () => {
    expect(
      reducer(endState, {
        type: CLEAR_BRANCH
      })
    ).toEqual(
      defaultState
    );
  });
});
