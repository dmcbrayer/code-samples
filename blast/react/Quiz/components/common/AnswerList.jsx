import React from 'react'
import PropTypes from 'prop-types'

const AnswerList = ({type, children}) => {

  let className = ''
  if(type === 'true_false') {
    className = 'answer-list answer-list--true-false'
  } else if(type === 'multiple_choice') {
    className = 'answer-list answer-list--multiple-choice'
  } else {
    className = 'answer-list answer-list--multiple-choice'
  }

  return (
    <ul className={className}>
      {children}
    </ul>
  )
}

AnswerList.propTypes = {
  type: PropTypes.oneOf(['true_false', 'multiple_choice', 'image']).isRequired,
}

export default AnswerList