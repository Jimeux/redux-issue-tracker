import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from 'components/Header'
import Menu from 'components/Menu'
import SnackBar from 'components/SnackBar'

import * as AlertActionCreators from 'actions/alertActions'
import * as MenuActionCreators from 'actions/menuActions'
import * as AuthActionCreators from 'actions/authActions'
import { setAssigned } from 'actions/filterActions'

const App = React.createClass({
  render() {
    const { alertState, menuState, authState } = this.props
    const { alertActions, menuActions, authActions, setAssigned } = this.props
    const user = {_id: authState.userId, username: authState.username}
    const showMyIssues = () => setAssigned(user)

    return (
        <div className="app">
          <Header {...menuActions} loggedIn={!!authState.token}/>
          {!authState.token ? null :
              <Menu {...menuState} {...menuActions} {...authState} {...authActions}
                  showMyIssues={showMyIssues}/>}
          {this.props.children}
          <SnackBar {...alertActions} alert={alertState}/>
        </div>
    )
  }
})

function mapPropsToState(state) {
  return {
    alertState: state.alert,
    menuState: state.menu,
    authState: state.auth,
    routing: state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(MenuActionCreators, dispatch),
    alertActions: bindActionCreators(AlertActionCreators, dispatch),
    authActions: bindActionCreators(AuthActionCreators, dispatch),
    setAssigned: (userId) => dispatch(setAssigned(userId))
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)