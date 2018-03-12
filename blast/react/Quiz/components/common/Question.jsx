import React from 'react'
import PropTypes from 'prop-types'

const Question = ({stem, children}) => (
  <div className="question">
    <p className="question-text">
      {stem}
    </p>
    {children}
  </div>
)

Question.PropTypes = {
  stem: PropTypes.string.isRequired
}

export default Question