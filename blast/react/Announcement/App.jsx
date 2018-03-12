import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from './components/Layout'
import { AnnouncementLoading } from './components/AnnouncementLoading'
import { AnnouncementWrapper } from './components/AnnouncementWrapper'
import { fetchAnnouncement, createUserAnnouncement, updateUserAnnouncement } from '../requests'

class App extends React.Component {
  state = {
    announcements: this.props.announcements,
    currentAnnouncement: null,
    currentUserAnnouncement: null,
    viewRegistered: false,
    loading: true
  }

  componentDidMount = () => {
    // Pull currentAnnouncement from the announcements array
    this.getNextAnnouncement()

    $('#announcementModal').modal('show')

    // Ensures that modal content gets removed whenever
    // the modal is hidden.
    $('#announcementModal').on('hidden.bs.modal', () => {
      this.setState({ loading: true })

      // Only send this message if the hide action does not
      // come from clicking the got it button.
      if(!this.state.viewRegistered) {
        this.handleSubmit()
      }
    })
  }

  getNextAnnouncement = () => {
    const announcements = this.state.announcements
    const currentAnnouncementId = announcements.shift()
    const userId = this.props.currentUser.id

    fetchAnnouncement(currentAnnouncementId, (result) => {

      // Builds new state from response
      let newState = {
        announcements,
        currentAnnouncement: result.announcement,
        currentUserAnnouncement: {
          announcementId: result.announcement.id,
          appearedAt: new Date(),
          userId,
        },
        viewRegistered: false,
        loading: false,
      }

      if(result.userAnnouncement) {
        newState.currentUserAnnouncement = result.userAnnouncement
      }

      this.setState(newState)
    })
  }

  handleSubmit = () => {
    const userAnnouncement = this.state.currentUserAnnouncement

    userAnnouncement.id
      ? updateUserAnnouncement(userAnnouncement.id, userAnnouncement, this.handleRegistrationSuccess)
      : createUserAnnouncement(userAnnouncement, this.handleRegistrationSuccess)
  }

  handleRegistrationSuccess = (userAnnouncement) => {
    const announcementsLeft = this.state.announcements.length

    this.setState({
      viewRegistered: true
    })

    if(announcementsLeft >= 1 ) {
      this.getNextAnnouncement()
    } else {
      $('#announcementModal').modal('hide')
    }
  }

  // Provides an optional callback method to ensure that state
  // transitions have completed before attempting to submit the
  // changes to the api.
  updateUserAnnouncement = (params, callback = () => {}) => {
    this.setState(prevState => ({
      currentUserAnnouncement: {
        ...prevState.currentUserAnnouncement,
        ...params
      }
    }), callback)
  }

  render() {
    const { 
      currentAnnouncement,
      currentUserAnnouncement,
      loading, 
      announcements 
    } = this.state

    const buttonText = announcements.length < 1 ? 'Got it' : 'Next'

    return (
      <Layout>
       {  !loading && currentAnnouncement
            ? <AnnouncementWrapper 
                currentAnnouncement={currentAnnouncement}
                updateUserAnnouncement={this.updateUserAnnouncement}
                onComplete={this.handleSubmit} 
                remainingAnnouncements={announcements}
                timer={this.props.timer}
                score={currentUserAnnouncement.score}
                impressions={currentUserAnnouncement.impressions}
                buttonText={buttonText} />
            : <AnnouncementLoading /> }
      </Layout>
    )
  }
}

App.propTypes = {
  currentUser: PropTypes.object.isRequired,
  timer: PropTypes.number,
  announcements: PropTypes.array.isRequired
}

App.defaultProps = {
  timer: 3,
}

export default App