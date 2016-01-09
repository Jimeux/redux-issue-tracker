import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'

import store from 'store/store'

import App from 'components/App'
import IssuesRoute from 'components/IssuesRoute'
import LoginForm from 'components/LoginForm'

import 'styles/core.scss'

const history = createHistory()
syncReduxAndRouter(history, store)

function authenticate(nextState, replaceState) {
  const notLoggedIn = !store.getState().auth.token
  if (notLoggedIn)
    replaceState({nextPathname: nextState.location.pathname}, '/login')
}

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={IssuesRoute} onEnter={authenticate}/>
          <Route path="/login" component={LoginForm}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('issue-container')
)