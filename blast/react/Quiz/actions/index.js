import * as constants from '../constants'

/*************************
 * Action Creators *
 *************************/

 /* Quiz Actions   
 ******************/

export const requestQuiz = () => {
  return {
    type: constants.REQUEST_QUIZ
  }
}

export const receiveQuiz = (json) => {
  return {
    type: constants.RECEIVE_QUIZ,
    payload: json
  }
}

export const startQuiz = () => {
  return {
    type: constants.START_QUIZ,
    payload: {
      view: 'questions',
      currentQuestion: 1,
      startTime: new Date()
    }
  }
}

export const progressQuestion = () => {
  return {
    type: constants.PROGRESS_QUESTION
  }
}

export const addAnswer = (json) => {
  return {
    type: constants.ADD_ANSWER,
    payload: json
  }
}

export const reviewQuiz = () => {
  return {
    type: constants.REVIEW_QUIZ,
    payload: 'review'
  }
}

export const finishQuiz = () => {
  return {
    type: constants.FINISH_QUIZ,
    payload: {
      view: 'results',
      endTime: new Date()
    }
  }
}

/* Entity Actions   
******************/

export const updateAnswerEntities = (answers) => {
  return {
    type: constants.ANSWER_ENTITIES_UPDATE,
    payload: answers
  }
}

export const updateQuestionEntities = (questions) => {
  return {
    type: constants.QUESTION_ENTITIES_UPDATE,
    payload: questions
  }
}

 /* User Actions   
 ******************/

export const setUser = (user) => {
  return {
    type: constants.SET_USER,
    payload: user
  }
}

export const setSettings = (settings) => {
  return {
    type: constants.SET_SETTINGS,
    payload: settings
  }
}

/* Session Actions
 ********************/
export const receiveIsAuthenticated = (isAuthenticated) => {
  return {
    type: constants.RECEIVE_IS_AUTHENTICATED,
    payload: isAuthenticated
  }
}

export const receiveAuthError = (error) => {
  return {
    type: constants.RECEIVE_AUTH_ERROR,
    payload: error
  }
}


/*************************
 * Async Action Creators *
 *************************/

export function answerQuestion(answer) {
  return dispatch => {
    dispatch(addAnswer(answer))
    dispatch(progressQuestion())
  }
}

