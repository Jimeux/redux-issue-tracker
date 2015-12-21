import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Router, Route, Link } from 'react-router'

import LoginForm from 'components/LoginForm'
import Header from 'components/Header'
import IssueTable from 'components/IssueTable'
import IssueForm from 'components/IssueForm'
import Menu from 'components/Menu'
import Fab from 'components/Fab'
import SnackBar from 'components/SnackBar'

import * as FormActionCreators from 'actions/issueFormActions'
import * as AuthActionCreators from 'actions/authActions'
import * as LoginActionCreators from 'actions/loginFormActions'
import * as AlertActionCreators from 'actions/alertActions'
import * as MenuActionCreators from 'actions/menuActions'

import 'styles/core.scss'

class App extends React.Component {
  render() {
    const { loggedIn, issueFormState, loginFormState, alert, menu } = this.props
    const { issueFormActions, loginFormActions, alertActions, menuActions } = this.props

    return (
        <div className="app">
          <ReactCSSTransitionGroup transitionName="menu"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            {menu.open ? <Menu {...menuActions}/> : null}
          </ReactCSSTransitionGroup>

          <Header loggedIn={loggedIn} {...menuActions} />

          {loggedIn ? <IssueForm {...issueFormActions} {...issueFormState} /> : null}

          <ReactCSSTransitionGroup transitionName="table"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            {loggedIn ? <IssueTable/> : null}
          </ReactCSSTransitionGroup>

          {!loggedIn ? <LoginForm {...loginFormActions} {...loginFormState} /> : null}

          <SnackBar {...alertActions} alert={alert}/>

          {loggedIn ? <Fab /> : null }

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
    loginFormState: state.loginForm,
    menu: state.menu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(MenuActionCreators, dispatch),
    issueFormActions: bindActionCreators(FormActionCreators, dispatch),
    loginFormActions: bindActionCreators(LoginActionCreators, dispatch),
    authActions: bindActionCreators(AuthActionCreators, dispatch),
    alertActions: bindActionCreators(AlertActionCreators, dispatch)
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)