import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/common/Button'
import QuizHeader from '../common/QuizHeader'
import Ribbon from '../../../components/common/Ribbon'
import MyQuizTopics from '../containers/MyQuizTopics'
import ModalTrigger from '../../../components/common/modal/ModalTrigger'
import Modal from '../../../components/common/modal/Modal'
import StartMessage from '../common/StartMessage'
import Loading from '../../../components/common/Loading'

const Start = ({timerSeconds, timerStatus, timerBarWidth, numberOfQuestions, currentQuestion, isReady, onStart, quiz, questionTime, disabled, topics, maxTopics}) => {
  const renderPlay = () => {
    if(isReady) {
      return <Button
        className={'button icon-circle icon-circle--start-quiz'}
        text={''}
        onClick={onStart}
        icon={'icon-circle__icon icon-circle__icon--magenta fa fa-3x fa-play'}
        disabled={disabled || isReady === false} />
      
    } else {
      return (
        <div className="quiz-start__loading">
          <h4 className="quiz-start__loading quiz-start__loading--spinner">
            <Loading isLoading={!isReady} />
          </h4>
          <span className="quiz-start__loading">Loading</span>
        </div>
      )
    }
  }
  
  return (
    <div>
      <QuizHeader
        timerSeconds={timerSeconds}
        timerStatus={timerStatus}
        timerBarWidth={timerBarWidth}
        numberOfQuestions={numberOfQuestions}
        currentQuestion={currentQuestion}
      />
      <section className="quiz-view quiz-start">
        <Ribbon label={"LET'S PLAY"} />
        <div className="bottom-margin bottom-margin--quadruple">
          <MyQuizTopics topics={topics} maxTopics = {5} />
        </div>
        <div className="top-and-bottom-margin top-and-bottom-margin--double">
          {renderPlay()}
        </div>
        <div className="bottom-margin">
          <a href="/" className="button btn-link quiz-start__button quiz-start__button--cancel">Cancel</a>
        </div>
          <ModalTrigger 
            className={"button btn-link quiz-start__button quiz-start__button--modal"}
            text="How does the quiz work?" />
        <Modal>
          <StartMessage questionTime={questionTime} />
        </Modal>
      </section>
    </div>
  )
}

Start.propTypes = {
  onStart:           PropTypes.func.isRequired,
  quiz:              PropTypes.object.isRequired,
  disabled:          PropTypes.bool.isRequired,
  questionTime:      PropTypes.number,
  numberOfQuestions: PropTypes.number,
  timerSeconds:      PropTypes.number.isRequired,
  timerStatus:       PropTypes.oneOf(['full', 'warning', 'danger']).isRequired,
  timerBarWidth:     PropTypes.number.isRequired,
  currentQuestion:   PropTypes.number,
  topics:            PropTypes.array,
  maxTopics:         PropTypes.number
}

export default Start
