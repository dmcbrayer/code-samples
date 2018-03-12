import React from 'react'
import PropTypes from 'prop-types'

const TimerBar = ({width}) => {

  let className = 'timer-bar'

  if(width >= 66) {
    className += ' timer-bar--full'
  } else if(width < 66 && width >=33) {
    className += ' timer-bar--warning'
  } else if(width < 33) {
    className += ' timer-bar--danger'
  } else {
    className += ' timer-bar--full'
  }

  return (
    <div className={className} style={{width: `${width}%`}} />
  )
}

TimerBar.propTypes = {
  width: PropTypes.number.isRequired,
}

export default TimerBar