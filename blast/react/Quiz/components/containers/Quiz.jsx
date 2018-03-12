import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { answerQuestion, finishQuiz, addAnswer } from '../../actions'
import { QuestionsHelper } from '../../utils'
import QuizView from '../views/Quiz'
import Question from '../containers/Question'

class Quiz extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      seconds: props.time
    }
  }

  componentDidMount() {
    this.resetTimerLoop(this.props.time)
    this.timerLoop()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentQuestion !== this.props.currentQuestion) {
      this.resetTimerLoop(nextProps.time)
      // Start timer
      this.timerLoop()
    } else {
      // Reset timer
      this.resetTimerLoop(nextProps.time)
    }
  }

  componentWillUnmount() {
    if(this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  resetTimerLoop = (seconds) => {
    // Reset the seconds left on the timer
    this.setState({ seconds: seconds })

    // Clear the interval timer if it exists
    if(this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  timerLoop = () => {
    const intervalId = setInterval(() => {

      this.setState({
        seconds: this.state.seconds - 1
      })

      // Timeout functionality
      if(this.state.seconds < 0) {
        if(this.props.currentQuestion === this.props.numberOfQuestions) {
          // Call addAnswer here so that the question does not attempt to
          // advance
          this.props.addAnswer({id: 0})

          // Then call finishQuiz to change the view
          this.props.finishQuiz()
        } else {
          // Otherwise, call this method, which adds the answer and
          // advances to the next question.
          this.props.answerQuestion({id: 0})
        }
      }
    }, 1000)

    // Saves the interval timer id to the state
    // so it can be cleared later
    this.setState({
      intervalId: intervalId
    })
  }

  handleAnswer = (answer) => {
    this.props.answerQuestion(answer)
    if(this.props.currentQuestion > this.props.numberOfQuestions) {
      this.props.finishQuiz()
    }
  }

  render() {
    const barWidth = (this.state.seconds / this.props.time) * 100

    // Timer Status
    let timerStatus = ''
    if(barWidth >= 66) {
      timerStatus = 'full'
    } else if(barWidth < 66 && barWidth >= 33) {
      timerStatus = 'warning'
    } else if(barWidth < 33) {
      timerStatus = 'danger'
    } else {
      timerStatus = 'full'
    }

    return (
      <QuizView
        timerSeconds={this.state.seconds}
        timerStatus={timerStatus}
        timerBarWidth={barWidth}
        numberOfQuestions={this.props.numberOfQuestions}
        currentQuestion={this.props.currentQuestion}
        transitionAppearTimeout={500}
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={500}>
        {this.props.question ? <Question
          key={this.props.question.id}
          question={this.props.question}
          handleAnswer={this.handleAnswer} /> : ''}
      </QuizView>
    )
  }
}

Quiz.propTypes = {
  question:          PropTypes.object,
  answerQuestion:    PropTypes.func.isRequired,
  finishQuiz:        PropTypes.func.isRequired,
  currentQuestion:   PropTypes.number,
  time:              PropTypes.number,
  numberOfQuestions: PropTypes.number,
  addAnswer:         PropTypes.func
}

const mapStateToProps = (state) => {
  const questionsHelper   = new QuestionsHelper(state)
  const currentQuestionId = questionsHelper.currentQuestionId()

  let props = {
    quiz:              state.quiz,
    currentQuestion:   state.routing.get('currentQuestion'),
    numberOfQuestions: state.quiz.get('questions').size,
    time:              state.settings.get('questionTime')
  }

  // Denormalize the question as long as there is a
  // currentQuestionId.
  if(currentQuestionId) {
    const question = questionsHelper.getDenormalizedQuestion(currentQuestionId)
    props = {...props, question}
  }

  return props
}

const mapDispatchToProps = (dispatch) => (
  {
    addAnswer: (answer)      => dispatch(addAnswer(answer)),
    answerQuestion: (answer) => dispatch(answerQuestion(answer)),
    finishQuiz: ()           => dispatch(finishQuiz())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)