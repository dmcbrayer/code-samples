import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import RavenMiddleware from 'redux-raven-middleware'

const sentryDsn = 'https://0fd473dab209476bae576ee3653404ba@sentry.io/112102'

let middleware = [ thunkMiddleware ]

if(process.env.DEBUG) {
  const loggerMiddleware = createLogger()
  // Development middleware stack
  middleware = [ ...middleware, loggerMiddleware ]
} else {
  // Production middleware stack
  middleware = [ ...middleware, RavenMiddleware(sentryDsn)]
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
