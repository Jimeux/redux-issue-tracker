import React from 'react'
import Transition from 'react-addons-css-transition-group'

export default class Menu extends React.Component {
  render() {
    const menu = (
        <div className="menu-container" onClick={() => this.props.closeMenu()}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <div className="heading">
              I<small>SSUE</small> T<small>RACKER</small>
            </div>
            <div className="body">
              <span className="user">Logged in as {this.props.username}</span>
              <ul>
                {!this.props.isEditor ? null :
                    <li onClick={() => this.props.showMyIssues()}>My Issues</li>}
                <li onClick={() => this.props.logout()}>Log out</li>
              </ul>
            </div>
          </div>
        </div>
    )

    return (
        <Transition transitionName="menu" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.props.open ? menu : null}
        </Transition>
    )
  }
}