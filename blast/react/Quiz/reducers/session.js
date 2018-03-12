import { Map } from 'immutable';
import * as constants from '../constants'

const init = Map({
  isAuthenticated: true,
  error: ''
});

export const session = (state = init, action) => {
  switch(action.type) {
    case constants.RECEIVE_AUTH_ERROR:
      return state.update('error', error => action.payload)
    case constants.RECEIVE_IS_AUTHENTICATED:
      return state.update('isAuthenticated', isAuthenticated => action.payload)
    default:
      return state;
  }
}
