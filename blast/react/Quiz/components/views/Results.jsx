import React from 'react'
import PropTypes from 'prop-types'
import AnimatedRadialProgressIndicator from '../../../components/common/AnimatedRadialProgressIndicator'
import Ribbon from '../../../components/common/Ribbon'
import Button from '../../../components/common/Button'
import ResultsHeader from '../common/ResultsHeader'
import ErrorMessage from '../../../components/common/ErrorMessage'

const Results = ({timerBarWidth, correctness, label, max, value, accuracy, time, reviewQuiz, error}) => (
  <div>
    <ResultsHeader
      timerBarWidth={timerBarWidth}
      correctness={correctness}
      label={label}
    />
    <section className="quiz-view">
      <Ribbon label={'Results'} />
      { error !== '' && <ErrorMessage message={error} /> }
      <AnimatedRadialProgressIndicator
        max={max}
        value={value}
        label="Points"
      />
      <h4 className="quiz-duration">Time: {time}</h4>
      <h4 className="quiz-duration">Accuracy: {accuracy}%</h4>

      <div className="button-group">
        <Button
          className={'button button--primary'}
          idName={'results-checkanswers'}
          text={'Check Answers'}
          onClick={reviewQuiz} />
        <a className="button button--primary" id="results-leaderboard" href="/leaderboards">View Leaderboard</a>
        <a className="button button--primary" id="results-home" href="/profiles/show">Home</a>
      </div>
    </section>
  </div>
)

Results.propTypes = {
  max:        PropTypes.number.isRequired,
  value:      PropTypes.number.isRequired,
  accuracy:   PropTypes.number.isRequired,
  time:       PropTypes.string.isRequired,
  reviewQuiz: PropTypes.func.isRequired
}

export default Results
