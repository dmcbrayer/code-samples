import humps from 'humps'
import 'whatwg-fetch'
import { normalize } from 'normalizr'
import * as actions from './index'
import * as schema from './schema'
import {  apiEndpoint, handleErrors, buildHeaders } from '../../requests'


export const createQuiz = (user) => {
  const dispatchQuizParams = {
    user_id: user.get("id")
  }

  return dispatch => {
    dispatch(actions.requestQuiz())

    return fetch(`${apiEndpoint}/quizzes`, {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(dispatchQuizParams)
      })
      .then(handleErrors)
      .then(
        response => response.json(),
        error => {
          if(error.message === '401') {
            dispatch(actions.receiveIsAuthenticated(false))
          } else {
            dispatch(actions.receiveAuthError('Oops!  There is an issue with your network connection.'))
          }
        })
      .then(json => {
        // Check to make sure response has the right shape
        if(json.id) {
          const quiz = humps.camelizeKeys(json)

          let normalizedQuiz = normalize(quiz, schema.quizSchema)
          dispatch(actions.updateQuestionEntities(normalizedQuiz.entities.questions))
          dispatch(actions.updateAnswerEntities(normalizedQuiz.entities.answers))
          dispatch(actions.receiveQuiz(normalizedQuiz.entities.quiz[normalizedQuiz.result]))
        }
      })
  }
}

export const updateQuiz = (quiz) => {
  return dispatch => {
    dispatch(actions.requestQuiz())

    let jsQuiz = {...quiz.toJS(), endTime: new Date()}

    const dispatchQuiz = {
      quiz: humps.decamelizeKeys(jsQuiz)
    };

    return fetch(`${apiEndpoint}/quizzes/${quiz.get('id')}`, {
        method: 'PUT',
        headers: buildHeaders(),
        body: JSON.stringify(dispatchQuiz)
      })
      .then(handleErrors)
      .then(
        response => response.json(),
        error => {
          if(error.message === '401') {
            dispatch(actions.receiveIsAuthenticated(false))
          } else {
            dispatch(actions.receiveAuthError('Oops!  There is an issue with your network connection and we could not save your quiz.  Please reload the page in order to re-take the quiz.'))
          }
        })
      .then(json => {
        // Check to make sure response has the right shape
        if(json.id) {
          const quiz = humps.camelizeKeys(json)
          let normalizedQuiz = normalize(quiz, schema.quizSchema)
          dispatch(actions.receiveQuiz(normalizedQuiz.entities.quiz[normalizedQuiz.result]))
        }
      })
  }
}

export const checkIsAuthenticated = () => {
  return dispatch => {
    return fetch(`${apiEndpoint}/auth_check`, {
        method: 'GET',
        headers: buildHeaders(),
      })
      .then(handleErrors)
      .then(
        response => response.json(),
        error => {
          if(error.message === '401') {
            dispatch(actions.receiveIsAuthenticated(false))
          } else {
            dispatch(actions.receiveAuthError('Oops!  There is an issue with your network connection and we could not save your quiz.  Please reload the page in order to re-take the quiz.'))
          }
        })
      .then(json => {
        // Check to make sure response has the right shape
        if(json.is_authenticated) {
          const payload = humps.camelizeKeys(json)
          dispatch(actions.receiveIsAuthenticated(payload.isAuthenticated))          
        }
      })
  }
}

/**
 * This action does a check to make sure the user is still authenticated before actually starting the quiz.
 * @returns {function(*)}
 */
export const initQuiz = () => {
  return dispatch => {
    return fetch(`${apiEndpoint}/auth_check`, {
        method: 'GET',
        headers: buildHeaders(),
      })
      .then(handleErrors)
      .then(
        response => response.json(),
        error => {
          if(error.message === '401') {
            dispatch(actions.receiveIsAuthenticated(false))
          } else {
            dispatch(actions.receiveAuthError('Oops!  There is an issue with your network connection and we could not save your quiz.  Please reload the page in order to re-take the quiz.'))
          }
        })
      .then(json => {
        // Check to make sure response has the right shape
        if(json.is_authenticated) {
          const quiz = humps.camelizeKeys(json)
          dispatch(actions.receiveIsAuthenticated(quiz.isAuthenticated))
          dispatch(actions.startQuiz())
        }
      })
  }
}
