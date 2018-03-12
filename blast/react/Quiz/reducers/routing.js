import { Map } from 'immutable';
import * as constants from '../constants'

const init = Map({});

export const routing = (state = init, action) => {
  switch(action.type) {
    case constants.START_QUIZ:
      return state.merge({ 
        view: action.payload.view, 
        currentQuestion: action.payload.currentQuestion
      })
    case constants.FINISH_QUIZ:
      return state.update('view', view => action.payload.view)
    case constants.PROGRESS_QUESTION:
      return state.update('currentQuestion', currentQuestion => currentQuestion + 1)
    case constants.CANCEL_QUIZ:
      return state.update('view', view => action.payload)
    case constants.REVIEW_QUIZ:
      return state.update('view', view => action.payload)
    default:
      return state
  }
}
