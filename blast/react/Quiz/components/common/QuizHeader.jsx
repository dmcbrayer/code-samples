import React from 'react'
import PropTypes from 'prop-types'
import Timer from './Timer'
import ProgressIndicator from './ProgressIndicator'
import TimerBar from './TimerBar'
import Navbar from '../../../components/layout/Navbar'
import Header from '../../../components/layout/Header'

const QuizHeader = ({timerSeconds, timerStatus, timerBarWidth, numberOfQuestions, currentQuestion}) => (
  <Header>
    <Navbar>
      <Timer time={timerSeconds} status={timerStatus} label="Time Left" />
      <ProgressIndicator label="Question" size={numberOfQuestions} active={currentQuestion} />
      <div className="navbar__placeholder"></div>
    </Navbar>
    <TimerBar width={timerBarWidth} />
  </Header>
)

QuizHeader.PropTypes = {
  timerSeconds:      PropTypes.number.isRequired,
  timerStatus:       PropTypes.oneOf(['full', 'warning', 'danger']).isRequired,
  timerBarWidth:     PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  currentQuestion:   PropTypes.number.isRequired
}

export default QuizHeader