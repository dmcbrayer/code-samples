import React from 'react'
import PropTypes from 'prop-types'

class MyQuizTopics extends React.Component {
  state = {
    topics: [],
    hidden: true,
  }
  
  componentDidUpdate = (prevProps) => {
    if(prevProps.topics !== this.props.topics) {
      this.setState({
        topics: this.props.topics,
        hidden: this.props.topics.length > this.props.maxTopics
      })
    }
  }

  toggleHidden = () => {
    this.setState({
      hidden: false,
    })
  }
  
  topicDisplay = (topics) => (
    topics.map( (topic, i) => <p key={i}> {topic} </p> )
  )

  truncatedTopics = () => (
    this.topicDisplay(this.state.topics.slice(0, this.props.maxTopics))
  )

  renderTopics = () => (
    !this.state.hidden 
      ? this.topicDisplay(this.state.topics)
      : <span>
          {this.truncatedTopics()}
          <button className="button btn-link quiz-start__button" onClick={this.toggleHidden}>
            More Quiz Topics
          </button>
        </span>
  )

  render() {
    return (
      <div className="subheading top-and-bottom-margin--double">
        <h4>My Quiz Topics</h4>
        {
          this.props.topics.length > 0 
            ? this.renderTopics() 
            : <p>You do not have any content assigned.</p> 
        }
      </div>
    )
  }
}

MyQuizTopics.propTypes = {
  topics: PropTypes.array.isRequired,
  maxTopics: PropTypes.number.isRequired
}

MyQuizTopics.defaultProps = {
  topics: [],
  maxTopics: 5
}

export default MyQuizTopics
