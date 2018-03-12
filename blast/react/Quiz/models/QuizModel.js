import Immutable from 'immutable'

export const QuizModel = Immutable.Record({
  id: null,
  userId: null,
  questions: Immutable.List,
  answers: Immutable.List,
  results: Immutable.List,
  time: '',
  maxPoints: 250,
  points: '',
  startTime: '',
  endTime: '',
  accuracy: '',
  numberCorrect: null
});
