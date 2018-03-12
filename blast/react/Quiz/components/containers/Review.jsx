import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { QuestionsHelper } from '../../utils'
import ReviewView from '../views/Review'

class Review extends React.Component {
  correctness = () => {
    // Correctness Results
    let correctness = []
    for(let i=0;i<this.props.results.size;i++) {
      correctness.push(this.props.results.get(i) === 'correct')
    }
    return correctness
  }

  render() {
    const { questions, givenAnswers, user } = this.props

    return (
      <ReviewView
        timerBarWidth={0}
        correctness={this.correctness()}
        label="Questions"
        questions={questions}
        givenAnswers={givenAnswers}
        user={user}
      />
    )
  }
}

Review.propTypes = {
  questions:           PropTypes.array.isRequired,
  givenAnswers:        PropTypes.array.isRequired,
  results:             PropTypes.object.isRequired,
  time:                PropTypes.number,
  user:                PropTypes.object
}

const mapStateToProps = (state) => {
  const questionsHelper = new QuestionsHelper(state)

  const questionOrderedMap = questionsHelper.questionIds().map( id => {
    return questionsHelper.getDenormalizedQuestion(id)
  })

  return {
    questions:           questionOrderedMap.toArray(),
    givenAnswers:        state.quiz.get('answers').toArray(),
    results:             state.quiz.get('results'),
    time:                state.settings.get('questionTime'),
    user:                state.user.toObject()
  }
}

const mapDispatchToProps = (dispatch) => (
  {}
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);