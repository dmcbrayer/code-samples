import React from 'react'
import PropTypes from 'prop-types'
import { Content } from './Content'
import { Actions } from './Actions'
import { ComponentWithTimer } from '../../components/common/ComponentWithTimer'

export class AnnouncementWrapper extends React.Component {
  
  componentDidMount() {
    this.props.updateUserAnnouncement({impressions: this.props.impressions + 1})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.currentAnnouncement && 
       nextProps.currentAnnouncement !== this.props.currentAnnouncement) {
      this.props.updateUserAnnouncement({impressions: nextProps.impressions + 1})
    }
  }

  handleCompleteView = () => {
    this.props.updateUserAnnouncement({viewedAt: new Date()}, this.props.onComplete)
  }

  handleVote = (newScore) => {
    const score = this.props.score === newScore ? 0 : newScore
    this.props.updateUserAnnouncement({score: score})
  }

  render() {
    const { 
      currentAnnouncement, 
      remainingAnnouncements, 
      timer,
      score
    } = this.props

    return (
      <div key={currentAnnouncement.id}>
        <Content
          title={currentAnnouncement.title} 
          content={currentAnnouncement.content} />
        <ComponentWithTimer timer={this.props.timer} render={disabled => (
          <Actions
            onButtonClick={this.handleCompleteView}
            onUpVote={() => this.handleVote(1)}
            onDownVote={() => this.handleVote(-1)}
            buttonDisabled={disabled}
            score={score}
            buttonText={this.props.buttonText} />
        )}/>
      </div>
    )
  }
}

AnnouncementWrapper.propTypes = {
  score: PropTypes.number,
  impressions: PropTypes.number,
  timer: PropTypes.number,
  buttonText: PropTypes.string.isRequired, 
  updateUserAnnouncement: PropTypes.func
}

AnnouncementWrapper.defaultProps = {
  impressions: 0,
  score: 0,
  timer: 3,
  updateUserAnnouncement: () => null,
  onComplete: () => null
}
