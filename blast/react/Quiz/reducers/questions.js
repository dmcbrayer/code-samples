import Immutable from 'immutable'
import { Question, QuestionMap } from '../models/Question'
import * as constants from '../constants'

const init = new QuestionMap();

const mergeQuestionEntities = (state, newQuestions) => {
  return state.merge(newQuestions.map((question) => new Question(question)))
}

export const questions = (state = init, action) => {
  switch(action.type) {
    case constants.QUESTION_ENTITIES_UPDATE:
      return mergeQuestionEntities(state, Immutable.fromJS(action.payload))
    default:
      return state
  }
}
