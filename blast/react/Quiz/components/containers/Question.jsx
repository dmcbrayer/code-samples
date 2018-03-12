import React from 'react'
import PropTypes from 'prop-types'
import { scrollTo } from '../../../utils'
import Answer from '../common/Answer'
import QuestionLayout from '../common/Question'
import Media from '../../../components/common/Media'
import AnswerList from '../common/AnswerList'

class Question extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAnswer: null
    }
  }

  handleAnswerClick = (e,a) => {
    this.setState({
      selectedAnswer: e.id
    })

    setTimeout( () => {
      this.props.handleAnswer(e)
      scrollTo(0, 500)
    }, 500)
  }

  renderMedia = () => {
    if( this.props.question.questionType === 'image' &&
      this.props.question.image !== '/images/original/missing.png' &&
      this.props.question.image !== '') {
      return <Media type="image" src={this.props.question.image} className="question-image" />
    }
    return '';
  }

  renderAnswers = () => {
    let answers = []
    this.props.question.answers.map(a => {
      let status = 'unanswered'
      if(this.state.selectedAnswer) {
        status = a.id === this.state.selectedAnswer ? 'selected' : 'invalid'
      }
      answers.push(<Answer
        key={a.id}
        text={a.answerText}
        status={status}
        disabled={this.state.selectedAnswer !== null}
        onClick={this.handleAnswerClick.bind(null, a)}/>)
    })

    return answers
  }

  render() {
    return (
      <QuestionLayout stem={this.props.question.questionText}>
        {this.renderMedia()}
        <AnswerList type={this.props.question.questionType}>
          {this.renderAnswers()}
        </AnswerList>
      </QuestionLayout>
    )
  }
}

Question.propTypes = {
  question:     PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired
}

Question.defaultProps = {
  handleAnswer: (answer) => {}
}

export default Question