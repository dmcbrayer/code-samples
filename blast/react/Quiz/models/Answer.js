import Immutable from 'immutable'

export const Answer = Immutable.Record({
  id: undefined,
  questionId: undefined,
  answerText: ''
});

export const AnswerMap = Immutable.OrderedMap;
