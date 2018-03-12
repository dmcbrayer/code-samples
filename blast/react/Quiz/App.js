import React from 'react'
import { Provider } from 'react-redux'
import { setUser, setSettings } from './actions'
import { checkIsAuthenticated } from './actions/requests'
import configureStore from './store'
import Quiz from './components/Quiz'

const store = configureStore();

export default class App extends React.Component {

  componentWillMount() {
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  componentDidMount() {
    if(this.props.user) {
      store.dispatch(setUser(this.props.user))
    }

    if(this.props.settings) {
      store.dispatch(setSettings(this.props.settings))
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Quiz />
      </Provider>
    )
  }

  onVisibilityChange = (event) => {
    if(document.visibilityState === 'visible') {
      store.dispatch(checkIsAuthenticated())
    }
  }
}