import React from 'react'
import PropTypes from 'prop-types'

const CorrectnessIndicator = ({label, values}) => {

  const items = values.map((isCorrect, i) => {
    return <li key={i} className={isCorrect ? 'correctness-indicator__list__item correctness-indicator__list__item--correct' : 'correctness-indicator__list__item correctness-indicator__list__item--incorrect'}>{isCorrect ? <span className="fa fa-check"></span> : <span className="fa fa-times"></span> }</li>
  })

  return(
    <div className="correctness-indicator">
      <h4 className="correctness-indicator__label">{label}</h4>
      <ul className="correctness-indicator__list">
        {items}
      </ul>
    </div>
  )
}

CorrectnessIndicator.propTypes = {
  values: PropTypes.array.isRequired,
  label:  PropTypes.string.isRequired
}

export default CorrectnessIndicator
