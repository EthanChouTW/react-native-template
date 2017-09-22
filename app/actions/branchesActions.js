import { fetchBranchListApi } from '../api';
import { SET_BRANCHES, SET_SELECTED_BRANCH, CLEAR_BRANCH } from './actionTypes';
import { dataHandler } from '../api/dataHandler';

const setBranchList = branches => ({
  type: SET_BRANCHES,
  byId: branches.byId,
  Ids: branches.Ids
});

export const setSelectedBranch = (branchSelectedId, branchSelectedName) => ({
  type: SET_SELECTED_BRANCH,
  branchSelectedId,
  branchSelectedName
});

export const clearBranch = () => ({
  type: CLEAR_BRANCH
});

export const getBranchList = () => async (dispatch, getState) => {
  const beeId = getState().auth.beeId;
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    const normalizedResponse = await fetchBranchListApi(beeId, accessToken);
    dispatch(setBranchList(normalizedResponse));
  });
};
