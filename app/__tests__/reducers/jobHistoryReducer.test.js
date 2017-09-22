import { SET_JOB_HISTORY, CLEAN_JOB_HISTORY } from '../../actions/actionTypes';
import reducer from '../../reducer/jobHistoryReducer';

describe('Store reducer', () => {
  const defaultState = {
    byId: {},
    Ids: [],
    currentPage: 0,
    done: false
  };

  const endState = {
    byId: {},
    Ids: [1, 2, 3],
    currentPage: 1,
    done: true
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle SET_JOB_HISTORY', () => {
    expect(
      reducer(defaultState, {
        type: SET_JOB_HISTORY,
        payload: {
          byId: {},
          Ids: [1, 2, 3],
          currentPage: 1,
          done: true
        }
      })
    ).toEqual(
      endState
    );
  });

  it('should clear job history', () => {
    expect(
      reducer(endState, {
        type: CLEAN_JOB_HISTORY
      })
    ).toEqual(
      defaultState
    );
  });
});
