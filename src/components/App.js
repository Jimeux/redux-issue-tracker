import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoginForm from 'components/LoginForm'
import Header from 'components/Header'
import IssueTable from 'components/IssueTable'
import IssueForm from 'components/IssueForm'
import * as FormActionCreators from 'actions/issueFormActions'
import * as AuthActionCreators from 'actions/authActions'
import * as LoginActionCreators from 'actions/loginFormActions'
import * as AlertActionCreators from 'actions/alertActions'

import 'styles/core.scss'

class App extends React.Component {
  render() {
    const { loggedIn, issueFormState, loginFormState, alert } = this.props
    const { issueFormActions, loginFormActions, alertActions } = this.props

    return (
        <div className="app">
          <ReactCSSTransitionGroup transitionName="menu"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            {!alert ? null : <Menu />}
          </ReactCSSTransitionGroup>

          <Header loggedIn={loggedIn}/>

          {!loggedIn ? null : <IssueForm {...issueFormActions} {...issueFormState} />}

          {!loggedIn ? null :
              <ReactCSSTransitionGroup transitionName="table"
                                       transitionAppear={true}
                                       transitionAppearTimeout={500}
                                       transitionEnterTimeout={500}
                                       transitionLeaveTimeout={300}>
                <IssueTable/>
              </ReactCSSTransitionGroup>}

          {loggedIn ? null : <LoginForm {...loginFormActions} {...loginFormState} />}


          <ReactCSSTransitionGroup transitionName="snackbar"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            {!alert ? null :
                <div className="snackbar" key="snackbar-key">
                  <div>{alert}
                    <a className="snackbar-link"
                       onClick={() => alertActions.clearAlert()}>CLOSE</a>
                  </div>
                </div>}
          </ReactCSSTransitionGroup>

          {!this.props.loggedIn ? null :
              <button type="button" id="issue-modal" className="btn-create" ref="modal"
                      data-toggle="modal" data-target="#modal-issue">
                <img src="/public/images/ic_edit.png"/>
              </button>}

        </div>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
        <div className="menu">
          <div className="heading">
            I<small>SSUE</small> T<small>RACKER</small>
          </div>
          <div className="body">
            <span className="user">Logged in as James</span>
            <ul>
              <li>My Issues</li>
              <li>Profile</li>
              <li>Log out</li>
            </ul>
          </div>
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
    authActions: bindActionCreators(AuthActionCreators, dispatch),
    alertActions: bindActionCreators(AlertActionCreators, dispatch)
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)