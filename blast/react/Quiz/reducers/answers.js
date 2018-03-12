import Immutable from 'immutable'
import { Answer, AnswerMap } from '../models/Answer'
import * as constants from '../constants'

const init = new AnswerMap();

const mergeAnswerEntities = (state, newAnswers) => {
  return state.merge(newAnswers.map((answer) => new Answer(answer)))
}

export const answers = (state = init, action) => {
  switch(action.type) {
    case constants.ANSWER_ENTITIES_UPDATE:
      // .fromJS() does not preserve the order of
      // normalized keys, so we have to make an OrderedMap
      // from the gate.
      return mergeAnswerEntities(state, Immutable.OrderedMap(action.payload))
    default:
      return state
  }
}
