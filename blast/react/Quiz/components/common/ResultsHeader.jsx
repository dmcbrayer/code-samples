import React from 'react'
import PropTypes from 'prop-types'
import TimerBar from './TimerBar'
import CorrectnessIndicator from './CorrectnessIndicator'
import Navbar from '../../../components/layout/Navbar'
import Header from '../../../components/layout/Header'

const ResultsHeader = ({timerBarWidth, correctness, label}) => (
  <Header>
    <Navbar>
      <CorrectnessIndicator values={correctness} label={label} />
    </Navbar>
    <TimerBar width={timerBarWidth} />
  </Header>
)

ResultsHeader.PropTypes = {
  timerBarWidth: PropTypes.number.isRequired,
  correctness:   PropTypes.object.isRequired,
  label:         PropTypes.string.isRequired
}

export default ResultsHeader