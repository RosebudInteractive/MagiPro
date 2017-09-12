import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-intl-redux'
import { BrowserRouter } from 'react-router-dom'

// import counterApp from './reducers'
import ru from 'react-intl/locale-data/ru';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { addLocaleData } from 'react-intl';

import { renderRoutes } from 'react-router-config'
import PendingNavDataLoader from './components/PendingNavDataLoader'
import appReducer from './reducers'

const routes = require('./routes');

const loggerMiddleware = createLogger()

// Grab the state from a global variable injected into the server-generated HTML
let preloadedState = window.__PRELOADED_STATE__

addLocaleData([...ru, ...en, ...fr]);

console.log('preloadedState: ');
console.log(preloadedState);
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const reducer = combineReducers({
  ...appReducer
})

// Create Redux store with initial state
const store = createStore(reducer, preloadedState, applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
))

render(
  <Provider store={store} locale={preloadedState.intl.locale} messages={preloadedState.intl.messages}>
    <BrowserRouter>
      <PendingNavDataLoader routes={routes} store={store} >
        {renderRoutes(routes)}
      </PendingNavDataLoader>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)