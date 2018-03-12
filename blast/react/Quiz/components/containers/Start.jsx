import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StartView from '../views/Start'
import { scrollTo } from '../../../utils'
import { initQuiz } from '../../actions/requests'
import { createQuiz } from '../../actions/requests'
import { preloadImagesHelper } from '../../utils'

class Start extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isReady: false,
      imagesLoading: false,
      imagesLoaded: false
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.user.has("id") !== prevProps.user.has("id")) {
      this.props.createQuiz(this.props.user)
    }

    if(this.state.imagesLoading === false && this.state.imagesLoaded === false && this.props.questions.size > 0) {
      const numImages = preloadImagesHelper(this.props.questions, (values) => {
        this.setState({
          imagesLoaded: true,
          isReady: true,
          imagesLoading: true
        })
      })

      if(numImages === 0) {
        this.setState({
          imagesLoaded: true,
          isReady: true,
          imagesLoading: false
        })
      } else {
        this.setState({
          imagesLoading: true
        })
      }
    }
  }

  handleOnStart = () => {
    scrollTo(0, 500)
    this.props.onStart()
  }

  render() {
    return (
      <StartView
        timerSeconds={this.props.time}
        timerStatus="full"
        timerBarWidth={100}
        currentQuestion={this.props.currentQuestion}
        onStart={this.handleOnStart}
        isReady={this.state.isReady}
        quiz={this.props.quiz}
        disabled={false}
        questionTime={this.props.time}
        numberOfQuestions={this.props.numQuestions}
        topics={this.props.topics}
        maxTopics={this.props.maxTopics} />
    )
  }
}

Start.propTypes = {
  quiz:              PropTypes.object.isRequired,
  user:              PropTypes.object.isRequired,
  questions:         PropTypes.object.isRequired,
  questionTime:      PropTypes.number,
  numberOfQuestions: PropTypes.number,
  currentQuestion:   PropTypes.number
}

Start.defaultProps = {
  time:         30,
  numQuestions: 5
}

const mapStateToProps = (state) => (
  {
    time: state.settings.get('questionTime'),
    numQuestions: state.settings.get('numberOfQuestions'),
    user: state.user,
    quiz: state.quiz,
    questions: state.entities.questions,
    currentQuestion: state.routing.get('currentQuestion'),
    topics: state.user.has('topics') ? state.user.get('topics').toArray() : [],
    maxTopics: state.settings.get('maxTopics')
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onStart: () => dispatch(initQuiz()),
    createQuiz: (user) => dispatch(createQuiz(user))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
