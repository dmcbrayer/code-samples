import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import QuizHeader from '../common/QuizHeader'

const Quiz = ({timerSeconds, timerStatus, timerBarWidth, numberOfQuestions, currentQuestion, transitionAppearTimeout, transitionEnterTimeout, transitionLeaveTimeout, children}) => (
  <div>
    <QuizHeader
      timerSeconds={timerSeconds}
      timerStatus={timerStatus}
      timerBarWidth={timerBarWidth}
      numberOfQuestions={numberOfQuestions}
      currentQuestion={currentQuestion}
    />
    <section className="quiz-view">
      <ReactCSSTransitionReplace
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={transitionAppearTimeout}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        overflowHidden={false} >
        {children}
      </ReactCSSTransitionReplace>
    </section>
  </div>
)

Quiz.propTypes = {
  transitionAppearTimeout: PropTypes.number.isRequired,
  transitionEnterTimeout:  PropTypes.number.isRequired,
  transitionLeaveTimeout:  PropTypes.number.isRequired
}

export default Quiz
