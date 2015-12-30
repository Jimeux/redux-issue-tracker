import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from 'components/Header'
import Menu from 'components/Menu'
import SnackBar from 'components/SnackBar'

import * as AlertActionCreators from 'actions/alertActions'
import * as MenuActionCreators from 'actions/menuActions'
import * as AuthActionCreators from 'actions/authActions'

const App = React.createClass({
  render() {
    const { alertState, menuState } = this.props
    const { alertActions, menuActions, authActions } = this.props

    return (
        <div className="app">
          <Header {...menuActions}/>
          <Menu {...menuState} {...menuActions} {...authActions}/>
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
    routing: state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(MenuActionCreators, dispatch),
    alertActions: bindActionCreators(AlertActionCreators, dispatch),
    authActions: bindActionCreators(AuthActionCreators, dispatch)
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)