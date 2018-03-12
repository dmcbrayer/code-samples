import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import StartContainer from './containers/Start'
import QuizContainer from './containers/Quiz'
import ResultsContainer from './containers/Results'
import ReviewContainer from './containers/Review'

class Quiz extends React.Component {

  componentWillUpdate(nextProps, nextState) {
    if(!nextProps.session.get('isAuthenticated')) {
      window.location.replace("/");
    }
  }

  renderView = () => {
    switch(this.props.route) {
      case 'start':
        return <StartContainer />
      case 'questions':
        return <QuizContainer />
      case 'results':
        return <ResultsContainer />
      case 'review':
        return <ReviewContainer />
      default:
        return <StartContainer />
    }
  }

  render() {
    return(
      <div>
        {this.renderView()}
      </div>
    )
  }
}

Quiz.propTypes = {
  route: PropTypes.string.isRequired,
}

Quiz.defaultProps = {
  route: 'start'
}

const mapStateToProps = (state) => (
  {
    route: state.routing.get('view'),
    session: state.session
  }
)

const mapDispatchToProps = (dispatch) => (
  {}
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);