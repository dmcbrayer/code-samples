import React from 'react'
import PropTypes from 'prop-types'
import Ribbon from '../../../components/common/Ribbon'
import QuestionReview from '../common/QuestionReview'
import ReviewHeader from '../common/ReviewHeader'

const Review = ({timerBarWidth, correctness, label, questions, givenAnswers, user}) => (
  <div>
    <ReviewHeader
      timerBarWidth={timerBarWidth}
      correctness={correctness}
      label={label}
    />
    <section className="quiz-view">
      <Ribbon label={'My Answers'} />
      <p>Scroll down to check your answers</p>
      { questions.map( (q, i) => {
        return <QuestionReview
          key={i}
          question={q}
          givenAnswer={givenAnswers[i]}
          questionNumber={i+1}
          user={user} />;
      }) }
      <div className="button-group button-group--top-border">
        <a className="button button--primary" id="checkanswers-leaderboard" href="/leaderboards">View Leaderboard</a>
        <a className="button button--primary" id="checkanswers-home" href="/profiles/show">Home</a>
      </div>
    </section>
  </div>
)

Review.propTypes = {
  questions:           PropTypes.array.isRequired,
  givenAnswers:        PropTypes.array.isRequired,
  user:                PropTypes.object.isRequired
}

Review.defaultProps = {
  correctness: [false, false, false, true, true],
  timerBarWidth: 100,
  label: '',
  givenAnswers: ['1', '1', '1', '1', '1']
}

export default Review