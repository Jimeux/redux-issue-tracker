import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoginForm from 'components/LoginForm'
import Header from 'components/Header'
//import IssueTable from 'components/IssueTable'
import IssueForm from 'components/IssueForm'
import * as FormActionCreators from 'actions/issueFormActions'
import * as AuthActionCreators from 'actions/authActions'
import * as LoginActionCreators from 'actions/loginFormActions'

import 'styles/core.scss'

class App extends React.Component {
  render() {
    const { loggedIn, issueFormState, loginFormState, alert } = this.props
    const { issueFormActions, loginFormActions } = this.props

    return (
        <div>
          <Header loggedIn={loggedIn}/>

          {!loggedIn ? null : <IssueForm {...issueFormActions} {...issueFormState} />}
          {loggedIn  ? null : <LoginForm {...loginFormActions} {...loginFormState} />}

          {alert ? <div style={{
              bottom: 0,
              background: '#444',
              position: 'absolute',
              width: '100%',
              color: 'white',
              padding: 24,
              fontSize: 16,
              fontWeight: 300}}>
            {alert}
          </div> : null}
        </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    loggedIn: !!state.auth.token,
    alert: state.alert,
    authState: state.auth,
    issueFormState: state.issueForm,
    loginFormState: state.loginForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    issueFormActions: bindActionCreators(FormActionCreators, dispatch),
    loginFormActions: bindActionCreators(LoginActionCreators, dispatch),
    authActions:      bindActionCreators(AuthActionCreators, dispatch)
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)