import { combineReducers } from 'redux'
import { user } from './user'
import { quiz } from './quiz'
import { questions } from './questions'
import { answers } from './answers'
import { routing } from './routing'
import { settings } from './settings'
import { session } from './session'

const entityReducer = combineReducers({
  questions,
  answers
});

const rootReducer = combineReducers({
  entities: entityReducer,
  user,
  quiz,
  routing,
  settings,
  session
});

export default rootReducer;