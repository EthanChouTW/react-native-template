import { getStoreDetailApi, updateBufferTimeApi, updateStoreOpenStatusApi } from '../api';
import {
  SET_STORE_DETAIL,
  SET_BUFFER_TIME,
  SET_STORE_OPEN_STATUS,
  CLEAR_STORE
} from './actionTypes';
import { dataHandler } from '../api/dataHandler';
import { StoreOpenStatus } from '../utils/appConstants';

export const setStoreDetail = store => ({
  type: SET_STORE_DETAIL,
  store
});

export const setBufferTime = bufferTime => ({
  type: SET_BUFFER_TIME,
  bufferTime
});

export const setStoreOpenStatus = (closed, temporarilyClosed, opensAt) => ({
  type: SET_STORE_OPEN_STATUS,
  payload: {
    closed,
    temporarilyClosed,
    opensAt
  }
});

export const clearStore = () => ({
  type: CLEAR_STORE
});

export const getStoreDetail = () => async (dispatch, getState) => {
  const storeId = getState().branches.branchSelectedId;
  if (storeId === undefined) return;
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    const store = await getStoreDetailApi(storeId, accessToken);
    dispatch(setStoreDetail(store));
  });
};

export const updateBufferTime = bufferTime => async (dispatch, getState) => {
  const storeId = getState().branches.branchSelectedId;
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    await updateBufferTimeApi(storeId, accessToken, { buffer_time: bufferTime });
    dispatch(setBufferTime(bufferTime));
  });
};

export const updateStoreOpenStatus = (onError, status, durationType, duration) => async (
  dispatch,
  getState
) => {
  const storeId = getState().branches.branchSelectedId;
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    const body = { status };
    if (status === StoreOpenStatus.CLOSE) {
      body.durationType = durationType;
      body.duration = duration;
    }

    try {
      const res = await updateStoreOpenStatusApi(storeId, accessToken, body);
      dispatch(
        setStoreOpenStatus(
          res.status === StoreOpenStatus.CLOSE,
          status === StoreOpenStatus.CLOSE,
          res.nextOpeningTime
        )
      );
    } catch (error) {
      console.warn('Warning: Failed to update store open status!', error);
      onError();
    }
  });
};
