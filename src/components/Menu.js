import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Menu extends React.Component {
  render() {
    const menu = (
        <div className="menu-container" onClick={() => this.props.closeMenu()}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <div className="heading">
              I<small>SSUE</small> T<small>RACKER</small>
            </div>
            <div className="body">
              <span className="user">Logged in as James</span>
              <ul>
                <li>My Issues</li>
                <li onClick={() => this.props.logout()}>Log out</li>
              </ul>
            </div>
          </div>
        </div>
    )

    return (
        <ReactCSSTransitionGroup transitionName="menu" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.props.open ? menu : null}
        </ReactCSSTransitionGroup>
    )
  }
}