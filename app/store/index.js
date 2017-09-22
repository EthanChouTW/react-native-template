import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import configurePersist from './configurePersist';
import reducer from '../reducer';

const defaultState = {};

exports.configureStore = (initialState = defaultState) => {
  const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(thunk),
    autoRehydrate(),
  ));
  configurePersist(store).catch(error => console.error(`Error while initializing persist: ${error}`));
  return store;
};
