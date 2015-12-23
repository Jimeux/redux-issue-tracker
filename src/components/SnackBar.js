import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class SnackBar extends React.Component {
  render() {
    const snackbar = (
        <div className="snackbar" key="snackbar-key">
          <div>{this.props.alert}
            <a className="snackbar-link"
               onClick={() => this.props.clearAlert()}>CLOSE</a>
          </div>
        </div>
    )
    return (
        <ReactCSSTransitionGroup transitionName="snackbar" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.props.alert ? snackbar : null}
        </ReactCSSTransitionGroup>
    )
  }
}