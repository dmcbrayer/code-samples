import { List, Map } from 'immutable';
import { QuizModel } from '../models/QuizModel'
import * as constants from '../constants'

const init = new QuizModel();

export const quiz = (state = init, action) => {
  switch(action.type) {
    case constants.REQUEST_QUIZ:
      return state
    case constants.RECEIVE_QUIZ:
      return state.merge(action.payload)
    case constants.START_QUIZ:
      return state.update('startTime', startTime => action.payload.startTime)
    case constants.ADD_ANSWER:
      return state.update('answers', answers => {
        // Apparently immutable Records return plain JS objects
        // by default?  So even though this should be a List,
        // when called 'answers' comes back as an array.
        const answersList = List(answers)
        return answersList.push(action.payload.id)
      })
    default:
      return state
  }
}
