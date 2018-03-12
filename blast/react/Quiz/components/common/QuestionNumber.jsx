import React from 'react'
import PropTypes from 'prop-types'

const QuestionNumber = ({status, label}) => {

  let className = 'question-number__circle'

  if(status === 'success') {
    className += ' question-number__circle--success'
  } else if(status === 'danger') {
    className += ' question-number__circle--danger'
  }

  return (
    <div className="question-number">
      <div className={className}>
        {label}
      </div>
    </div>
  )
}

QuestionNumber.propTypes = {
  status: PropTypes.oneOf(['success', 'danger']).isRequired,
  label:  PropTypes.number.isRequired
}

export default QuestionNumber