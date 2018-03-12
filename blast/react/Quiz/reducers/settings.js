import { Map } from 'immutable';
import * as constants from '../constants'

const init = Map({});

export const settings = (state = init, action) => {
  switch(action.type) {
    case constants.SET_SETTINGS:
      return state.merge(action.payload)
    default:
      return state;
  }

}
