import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchJobHistory, cleanJobHistory } from '../../actions/jobHistoryActions';
import { SET_JOB_HISTORY, CLEAN_JOB_HISTORY } from '../../actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('job history actions', () => {
  it('should set job history', () => {
    const mockResponse = [{ id: 1 }, { id: 2 }];
    fetch.mockResponse(JSON.stringify(mockResponse));

    const store = mockStore({
      jobHistory: {
        currentPage: 0,
        done: false
      },
      auth: {
        accessToken: ''
      }
    });
    const expectedAction = [{
      type: SET_JOB_HISTORY,
      payload: {
        byId: {
          1: { id: 1 },
          2: { id: 2 }
        },
        Ids: [1, 2],
        currentPage: 1,
        done: false
      }
    }];

    return store.dispatch(fetchJobHistory()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should clean job history', () => {
    const expectedAction = {
      type: CLEAN_JOB_HISTORY
    };
    expect(cleanJobHistory()).toEqual(expectedAction);
  });
});
