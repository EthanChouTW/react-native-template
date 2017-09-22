import Firebase from 'firebase';
import { FULFILLMENT_CHANGED, UNLOAD_FULFILLMENT } from './actionTypes';

let firebase = null;
const unlistenByFulfillmentId = {};

export const FULFILLMENT_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REPLACED: 'replaced',
  OUT_OF_STOCK: 'out_of_stock',
  NOT_FOUND: 'not_found'
};

export const PRINTER_STATUS = {
  PRINTED: 'lbl_print_status_printed',
  NOT_PRINTED: 'lbl_print_status_not_yet'
};

// plain object action
export const fulfillmentChanged = fulfillment => ({
  type: FULFILLMENT_CHANGED,
  payload: fulfillment
});

export const unloadFulfillment = fulfillmentId => ({
  type: UNLOAD_FULFILLMENT,
  payload: fulfillmentId
});

export const setupFirebase = () => async (dispatch, getState) => {
  const state = getState();
  const endpoint = state.auth.firebaseEndpoint;
  firebase = new Firebase(endpoint);

  try {
    const firebaseCustomToken = state.auth.firebaseCustomToken;
    await firebase.authWithCustomToken(firebaseCustomToken);
    console.log('firebase auth success');
    return firebase;
  } catch (error) {
    console.warn('Warning: Failed to authenticate firebase fulfillments!', error);
    return error;
  }
};

export const listenFulfillment = fulfillmentId => (dispatch) => {
  console.log(`firebase listen to fulfillment, ID:${fulfillmentId}`);
  if (!firebase) {
    console.warn('firebase is not connected', firebase);
    return;
  }
  if (unlistenByFulfillmentId[fulfillmentId]) {
    console.log(`warning: tried to listen a unlistened fulfillment ${fulfillmentId}`);
    return;
  }
  const path = `fulfillment-${fulfillmentId}`;
  const ref = firebase.child(path).ref();
  const onValueChange = ref.on('value', (snapshot) => {
    if (snapshot.val() === undefined) {
      return;
    }
    dispatch(fulfillmentChanged(snapshot.val()));
  });
  // create unlisten function for future
  unlistenByFulfillmentId[fulfillmentId] = () => ref.off('value', onValueChange);
};

export const updatedFulfillment = (fulfillmentId, newFulfillment) => async (dispatch) => {
  console.log(`firebase listen to fulfillment, ID:${fulfillmentId}`);
  if (!firebase) {
    console.warn('firebase is not connected', firebase);
    return;
  }
  dispatch(fulfillmentChanged(newFulfillment));
  const path = `fulfillment-${fulfillmentId}`;
  const itemsRef = firebase.child(path).ref();
  await itemsRef.set(newFulfillment);
};


export const listenFulfillments = fulfillmentIds => (dispatch) => {
  if (!firebase) {
    console.warn('firebase is not connected', firebase);
    return;
  }
  fulfillmentIds.forEach((fulfillmentId) => {
    if (unlistenByFulfillmentId[fulfillmentId]) {
      console.warn(`warning: tried to listen a unlistened fulfillment ${fulfillmentId}`);
      return;
    }
    const path = `${fulfillmentId}`;
    const ref = firebase.child(path).ref();
    const onValueChange = ref.on('value', (snapshot) => {
      dispatch(fulfillmentChanged(snapshot.val()));
    });
    // create unlisten function for future
    unlistenByFulfillmentId[fulfillmentId] = () => ref.off('value', onValueChange);
  });
};

export const unlistenFulfillments = fulfillmentIds => (dispatch) => {
  fulfillmentIds.forEach((id) => {
    const unlisten = unlistenByFulfillmentId[id];
    if (unlisten) {
      unlisten();
      dispatch(unloadFulfillment(id));
    } else {
      console.warn(`warning: tried to unlisten a unlisten fulfillment with id = ${id}`);
    }
  });
};

export const unlistenAllfulfillments = () => () => {
  unlistenFulfillments(Object.keys(unlistenByFulfillmentId));
};
