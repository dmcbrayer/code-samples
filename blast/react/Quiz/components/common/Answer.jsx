import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/common/Button'

const Answer = ({text, status, onClick, disabled}) => {
  let className = 'button'

  if(status === 'unanswered') {
    className += ' button--primary answer'
  } else if(status === 'selected') {
    className += ' button--primary answer'
  } else if(status === 'invalid') {
    className += ' button--primary answer invalid answer-review'
  } else if(status === 'correct') {
    className += ' button--success answer answer-review'
  } else if(status === 'incorrect') {
    className += ' button--danger answer answer-review'
  }

  if(!!('ontouchstart' in window)) {
    className += ' no-hover'
  }

  return (
    <li className="answer-list__item">
      <Button text={text} onClick={onClick} className={className} disabled={disabled} />
    </li>
  )
}

Answer.PropTypes = {
  text:    PropTypes.string.isRequired,
  status:  PropTypes.oneOf(['unanswered', 'correct', 'incorrect', 'invalid', 'selected']).isRequired,
  onClick: PropTypes.func
}

Answer.defaultProps = {
  status:   'unanswered',
  disabled: false
}

export default Answer