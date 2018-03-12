import { Schema, arrayOf } from 'normalizr'

/*************************
 * Schemas *
 *************************/

export const quizSchema = new Schema('quiz', { idAttribute: 'id' });
export const questionSchema = new Schema('questions', { idAttribute: 'id' });
export const answerSchema = new Schema('answers', { idAttribute: 'id' });

quizSchema.define({
  questions: arrayOf(questionSchema)
});

questionSchema.define({
  answers: arrayOf(answerSchema)
});