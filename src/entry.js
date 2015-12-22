import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'components/App'
import LoginForm from 'components/LoginForm'
import store from 'store/store'
import { Router, Route, Link } from 'react-router'

/*--- START Bootstrap imports ---*/
import jQuery from 'jquery'  //TODO: Replace with dropdown and modal libraries
global.$ = jQuery
global.jQuery = jQuery
require('vendor/bootstrap/dropdown')
require('vendor/bootstrap/modal')
/*--- END Bootstrap imports ---*/

import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
const history = createHistory()
syncReduxAndRouter(history, store)

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}/>
        <Route path="/login" component={LoginForm}/>
      </Router>
    </Provider>,
    document.getElementById('issue-container')
)