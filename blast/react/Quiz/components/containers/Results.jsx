import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reviewQuiz } from '../../actions'
import { updateQuiz } from '../../actions/requests'
import ResultsView from '../views/Results'
import moment from 'moment'

class Results extends React.Component {

  componentWillMount() {
    this.props.updateQuiz(this.props.quiz)
  }

  accuracy = () => {
    return parseInt((this.props.quiz.accuracy * 100).toFixed())
  }

  time = () => {
    const startTime    = moment.utc(this.props.quiz.startTime)
    const endTime      = moment.utc(this.props.quiz.endTime)
    const quizDuration = moment.duration(endTime.diff(startTime))

    return moment.utc(quizDuration.asMilliseconds()).format("mm:ss")
  }

  correctness = () => {
    // Correctness Results
    let correctness = []
    for(let i=0;i<this.props.quiz.results.size;i++) {
      correctness.push(this.props.quiz.results.get(i) === 'correct')
    }
    return correctness
  }

  render() {
    return (
      <ResultsView
        timerBarWidth={0}
        correctness={this.correctness()}
        label="Questions"
        reviewQuiz={this.props.reviewQuiz}
        max={this.props.quiz.maxPoints}
        value={this.props.quiz.points}
        accuracy={parseInt(this.accuracy())}
        time={this.time()}
        error={this.props.session.get('error')}
      />
    )
  }
}

Results.propTypes = {
  quiz:       PropTypes.object.isRequired,
  time:       PropTypes.number.isRequired,
  updateQuiz: PropTypes.func.isRequired,
  reviewQuiz: PropTypes.func.isRequired
}

const mapStateToProps = (state) => (
  {
    quiz: state.quiz,
    time: state.settings.get('questionTime'),
    session: state.session
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    updateQuiz: (quiz) => dispatch(updateQuiz(quiz)),
    reviewQuiz: ()     => dispatch(reviewQuiz())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)