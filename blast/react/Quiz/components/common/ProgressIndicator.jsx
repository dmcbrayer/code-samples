import React from 'react'
import PropTypes from 'prop-types'

const ProgressIndicator = ({label, size, active}) => {

  let items = []

  for(let i=1;i<=size;i++) {
    let className = 'progress-indicator__list__item'

    if(i < active) {
      className += ' progress-indicator__list__item--past'
    }
    else if(i > active) {
      className += ' progress-indicator__list__item--future'
    }

    items.push(<li key={i} className={className}>{i}</li>)
  }

  return (
    <div className="progress-indicator">
      <h4 className="progress-indicator__label">{label}</h4>
      <ul className="progress-indicator__list">
        {items}
      </ul>
    </div>
  )
}

ProgressIndicator.propTypes = {
  label:  PropTypes.string.isRequired,
  size:   PropTypes.number.isRequired,
  active: PropTypes.number.isRequired
}

ProgressIndicator.defaultProps = {
  label: 'Question',
  size:   5,
  active: 0
}

export default ProgressIndicator