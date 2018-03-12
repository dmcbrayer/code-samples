import React from 'react'
import PropTypes from 'prop-types'

const Timer = ({time, label, status}) => {
  const classes = {
    'full':    'timer timer--full',
    'warning': 'timer timer--warning',
    'danger':  'timer timer--danger'
  }

  return (
    <div className={classes[status]}>
      <h4 className="timer__label">{label}</h4>
      <span className="timer__time">{time}</span>
    </div>
  )
}

Timer.propTypes = {
  time:   PropTypes.number.isRequired,
  label:  PropTypes.string.isRequired,
  status: PropTypes.oneOf(['full', 'warning', 'danger']).isRequired
}

export default Timer