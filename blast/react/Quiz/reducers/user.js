import { Map } from 'immutable';
import * as constants from '../constants'

const init = Map({});

export const user = (state = init, action) => {
  switch(action.type) {
    case constants.SET_USER:
      return state.merge(action.payload)
    default:
      return state;
  }

}
