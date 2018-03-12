import React from 'react'
import PropTypes from 'prop-types'

const QuestionTopics = ({ topics }) => (
  <div className="question-topics">
    { topics.map( (topic, i) =>
        <p key={i} className="question-topics__label question-topics__label--white">
          {topic}
        </p> 
      )
    }
  </div>
)

QuestionTopics.propTypes = {
  topics: PropTypes.array.isRequired
}

QuestionTopics.defaultProps = {
  topic: []
}

export default QuestionTopics