import { SET_STORE_DETAIL, SET_BUFFER_TIME, SET_STORE_OPEN_STATUS, CLEAR_STORE } from '../actions/actionTypes';

const initialState = {
  id: undefined,
  name: '',
  bufferTime: 0,
  closed: false,
  temporarilyClosed: false,
  opensAt: null
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_DETAIL:
      return {
        id: action.store.id,
        name: action.store.name,
        bufferTime: action.store.bufferTime,
        closed: action.store.closed,
        temporarilyClosed: action.store.temporarilyClosed,
        opensAt: action.store.opensAt
      };
    case SET_BUFFER_TIME:
      return {
        ...state,
        bufferTime: action.bufferTime
      };
    case SET_STORE_OPEN_STATUS:
      return {
        ...state,
        closed: action.payload.closed,
        temporarilyClosed: action.payload.temporarilyClosed,
        opensAt: action.payload.opensAt
      };
    case CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};
