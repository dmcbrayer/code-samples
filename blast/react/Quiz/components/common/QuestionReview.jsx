import React from 'react'
import PropTypes from 'prop-types'
import QuestionNumber from '../common/QuestionNumber'
import AnswerList from '../common/AnswerList'
import Answer from '../common/Answer'
import Question from '../common/Question'
import QuestionTopics from '../common/QuestionTopics'
import QuestionComplaintForm from '../../../components/containers/QuestionComplaintForm'

class QuestionReview extends React.Component {

  checkNumberClass = () => {
    const correctAnswerId = this.props.question.correctAnswers[0]

    if(this.props.givenAnswer === correctAnswerId.toString()) {
      return 'success'
    } else {
      return 'danger'
    }
  }

  checkButtonStatus = (answerId) => {
    const correctAnswerId = this.props.question.correctAnswers[0]

    if(answerId === correctAnswerId) {
      return "correct"
    } else if(answerId.toString() === this.props.givenAnswer) {
      return "incorrect"
    } else {
      return "invalid"
    }
  }

  renderAnswers = () => {
    let answers = []

    this.props.question.answers.map( a => {
      answers.push(<Answer
        key={a.id}
        text={a.answerText}
        status={this.checkButtonStatus(a.id)}
      />)
    })

    return answers
  }

  renderMedia = () => {
    if( this.props.question.questionType === 'image' &&
      this.props.question.image !== '/images/original/missing.png' &&
      this.props.question.image !== '') {
      return <img src={this.props.question.image} className="question-image" />
    }
    return '';
  }

  render() {
    return (
      <div>
        <QuestionNumber label={this.props.questionNumber} status={this.checkNumberClass()}/>
        <QuestionTopics topics={this.props.question.topics} />
        <Question stem={this.props.question.questionText}>
          {this.renderMedia()}
          <AnswerList type="multiple_choice">
            { this.renderAnswers() }
          </AnswerList>
        </Question>
        <QuestionComplaintForm
           questionId={this.props.question.id}
           user={this.props.user}
           reasons={this.props.question.flagReasons} />
      </div>
    )
  }
}

QuestionReview.propTypes = {
  question:       PropTypes.object.isRequired,
  givenAnswer:    PropTypes.string.isRequired,
  questionNumber: PropTypes.number.isRequired
}

export default QuestionReview
