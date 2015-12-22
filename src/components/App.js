import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replacePath } from 'redux-simple-router'

import LoginForm from 'components/LoginForm'
import Header from 'components/Header'
import IssueTable from 'components/IssueTable'
import IssueForm from 'components/IssueForm'
import Menu from 'components/Menu'
import Fab from 'components/Fab'
import SnackBar from 'components/SnackBar'

import * as FormActionCreators from 'actions/issueFormActions'
import * as AuthActionCreators from 'actions/authActions'
import * as AlertActionCreators from 'actions/alertActions'
import * as MenuActionCreators from 'actions/menuActions'

import 'styles/core.scss'

class App extends React.Component {

  static willTransitionTo(transition) {
    const { loggedIn, replacePath } = this.props
    if (!loggedIn)
      transition.redirect('login', {}, { 'nextPath': transition.path });
  }

  /*componentWillMount() {
    const { loggedIn, replacePath } = this.props
    if (!loggedIn) replacePath('/login')
  }*/

  render() {
    const { issueFormState, alert, menu } = this.props
    const { issueFormActions, alertActions, menuActions } = this.props

    return (
        <div className="app">

          <Header {...menuActions} />

          <ReactCSSTransitionGroup transitionName="menu" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {menu.open ? <Menu {...menuActions}/> : null}
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="table" transitionAppear={true} transitionAppearTimeout={500}
                                   transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <IssueTable/>
          </ReactCSSTransitionGroup>

          <IssueForm {...issueFormActions} {...issueFormState}/>
          <SnackBar {...alertActions} alert={alert}/>
          <Fab />

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
    menu: state.menu,
    routing: state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(MenuActionCreators, dispatch),
    issueFormActions: bindActionCreators(FormActionCreators, dispatch),
    authActions: bindActionCreators(AuthActionCreators, dispatch),
    alertActions: bindActionCreators(AlertActionCreators, dispatch),
    replacePath: (path) => dispatch(replacePath(path))
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)