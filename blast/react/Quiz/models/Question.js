import Immutable from 'immutable'

export const Question = Immutable.Record({
  id: undefined,
  questionType: undefined,
  questionText: '',
  explanation: '',
  correctAnswers: Immutable.List,
  image: '',
  topics: Immutable.List,
  flagReasons: Immutable.List
});

export const QuestionMap = Immutable.OrderedMap;

