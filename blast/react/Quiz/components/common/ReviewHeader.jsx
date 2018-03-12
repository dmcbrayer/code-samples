import React from 'react'
import PropTypes from 'prop-types'
import TimerBar from './TimerBar'
import Navbar from '../../../components/layout/Navbar'
import CorrectnessIndicator from './CorrectnessIndicator'
import Header from '../../../components/layout/Header'

const ReviewHeader = ({timerBarWidth, correctness, label}) => (
  <Header>
    <Navbar>
      <CorrectnessIndicator values={correctness} label={label} />
    </Navbar>
    <TimerBar width={timerBarWidth} />
  </Header>
)

ReviewHeader.PropTypes = {
  timerBarWidth: PropTypes.number.isRequired,
  correctness:   PropTypes.object.isRequired,
  label:         PropTypes.string.isRequired
}

export default ReviewHeader