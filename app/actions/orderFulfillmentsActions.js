import {
  getOrderFulfillmentsApi,
  changeOrderFulfillmentsStatus,
  getRejectReasonApi,
  syncFulfillmentItemsApi
} from '../api';
import { dataHandler } from '../api/dataHandler';
import {
  SET_NEW_ORDER_FULFILLMENTS,
  SET_PREPARING_ORDER_FULFILLMENTS,
  UNLOAD_ORDER_FULFILLMENT
} from './actionTypes';

export const TAB_NEW = 'NEW';
export const TAB_PREPARING = 'PREPARING';

const setNewOrderFulfillments = orderFulfillments => ({
  type: SET_NEW_ORDER_FULFILLMENTS,
  payload: orderFulfillments
});

const setPreparingOrderFulfillments = orderFulfillments => ({
  type: SET_PREPARING_ORDER_FULFILLMENTS,
  payload: orderFulfillments
});

const unloadOrderFulfillment = orderfulfillmentId => ({
  type: UNLOAD_ORDER_FULFILLMENT,
  payload: orderfulfillmentId
});

export const getOrderFulfillments = (tab, page) => async (
  dispatch,
  getState
) => {
  const accessToken = getState().auth.accessToken;
  // set storeId, statuses, page, and fulfillmentStatuses
  const storeId = getState().branches.branchSelectedId;
  if (storeId === undefined) return;
  let statuses = '';
  let fulfillmentStatuses = '';
  if (tab === TAB_NEW) {
    statuses = 'unassigned%2Cpending_acceptance%2Cpending_start';
    fulfillmentStatuses =
      'fulfillment_processing%2Cfulfillment_requested_assignment%2Cfulfillment_assigned';
  } else if (tab === TAB_PREPARING) {
    statuses = 'started';
  }
  await dataHandler(dispatch, async () => {
    const normalizedOrderFulfillments = await getOrderFulfillmentsApi(
      storeId,
      accessToken,
      statuses,
      page,
      fulfillmentStatuses
    );
    if (tab === TAB_NEW) {
      dispatch(setNewOrderFulfillments(normalizedOrderFulfillments));
    } else if (tab === TAB_PREPARING) {
      dispatch(setPreparingOrderFulfillments(normalizedOrderFulfillments));
    }
  });
};

export const acceptOrderFulfillments = fulfillmentsId => async (
  dispatch,
  getState
) => {
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    const response = await changeOrderFulfillmentsStatus(
      fulfillmentsId,
      accessToken,
      {
        statusAction: 'accept',
        role: 'shopper'
      }
    );
    console.log(response);
  });
};

export const startOrderFulfillments = fulfillmentsId => async (
  dispatch,
  getState
) => {
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    const response = await changeOrderFulfillmentsStatus(
      fulfillmentsId,
      accessToken,
      {
        statusAction: 'start',
        role: 'shopper'
      }
    );
    console.log(response);
  });
};

export const rejectOrderFulfillments = (
  fulfillmentsId,
  reasonCode,
  reasonText
) => async (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  await dataHandler(dispatch, async () => {
    const unloadedOrderFulfillment = await changeOrderFulfillmentsStatus(
      fulfillmentsId,
      accessToken,
      {
        statusAction: 'reject',
        role: 'shopper',
        reject_code: reasonCode,
        reason_text: reasonText
      }
    );
    dispatch(unloadOrderFulfillment(unloadedOrderFulfillment.id));
  });
};

export const getRejectReason = () => async (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;
  let rejectReason = null;
  await dataHandler(dispatch, async () => {
    rejectReason = await getRejectReasonApi(accessToken);
  });
  return rejectReason.food;
};

export const syncFulfillmentItems = (orderfulfillmentId) => async (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;
  await dataHandler(dispatch, async () => {
    await syncFulfillmentItemsApi(accessToken, orderfulfillmentId);
  });
};
