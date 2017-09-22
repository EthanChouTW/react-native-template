import { MainNavigator } from '../components/Main';
import { UNAUTH_USER } from '../actions/actionTypes';

const initialState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Home'));

module.exports = (state = initialState, action) => {
  if (action.type === UNAUTH_USER) {
    return initialState;
  }
  const nextState = MainNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
