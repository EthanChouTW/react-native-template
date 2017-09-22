import { fetchJobHistoryApi } from '../api';
import { SET_JOB_HISTORY, CLEAN_JOB_HISTORY } from './actionTypes';
import { arrayToObjectById, arrayToIds } from '../utils/helpers';
import { dataHandler } from '../api/dataHandler';

const appendJobHistory = (normalizedJobHistory, currentPage) => ({
  type: SET_JOB_HISTORY,
  payload: {
    byId: normalizedJobHistory.byId,
    Ids: normalizedJobHistory.Ids,
    currentPage,
    done: normalizedJobHistory.Ids.length === 0
  }
});

export const fetchJobHistory = () => async (dispatch, getState) => {
  const { jobHistory } = getState();
  const accessToken = getState().auth.accessToken;
  const page = jobHistory.currentPage + 1;
  await dataHandler(dispatch, async () => {
    const response = await fetchJobHistoryApi(page, accessToken);
    const normalizedJobHistory = {
      byId: arrayToObjectById(response),
      Ids: arrayToIds(response)
    };
    dispatch(appendJobHistory(normalizedJobHistory, page));
  });
};

export const cleanJobHistory = () => ({
  type: CLEAN_JOB_HISTORY
});
