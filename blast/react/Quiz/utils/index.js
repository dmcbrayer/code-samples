// These helpers exist because constructing objects through immutable.js
// is a bit of a pain, and makes the code in the containers components hard to read.
// This gives us a more imperative API

export const preloadImagesHelper = (questions, callback) => {
  let images = []

  questions.forEach(question => {
    if(question.image !== '/images/original/missing.png' && question.image !== '') {
      let src = question.image
      if (images.indexOf(src) === -1) {
        images.push(src)
      }
    }
  })

  let promises = images.map(image => {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.addEventListener('load', resolve)
      img.src = image
    })
  })

  Promise.all(promises).then(values => {
    callback(values)
  })

  return images.length
}

// This quickly generates a list of question ids in the current
// quiz.  This is to set up the review page.
//
export class QuestionsHelper {
  constructor(store) {
    this.store = store
  }

  getQuestion(questionId) {
    return this.store.entities.questions.get(questionId.toString())
  }

  getDenormalizedQuestion(questionId) {
    // Convert question Record to JS
    let question = this.store.entities.questions
                      .get(questionId.toString())
                      .toJS()

    // Get answers by question id.
    // Convert answers OrderedMap to an array.
    // Convert each element in the array
    // to JS object
    let answers = this.store.entities.answers
                    .filter( answer => { 
                      return answer.get('questionId') === question.id
                    })
                    .toArray()
                    .map(a => a.toJS());

    // Return denormalized object
    return {...question, answers}
  }

  currentQuestionId() {
    const quiz = this.store.quiz
    const routing = this.store.routing

    // If we're on the 4th question, this pulls 
    // the 4th id from the questions List, etc.
    return quiz.get('questions').get(routing.get('currentQuestion') - 1)
  }

  questionIds() {
    return this.store.quiz.get('questions')
  }
}