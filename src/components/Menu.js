import React from 'react'

export default class Menu extends React.Component {
  render() {
    return (
        <div className="menu-container" onClick={() => this.props.closeMenu()}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
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
        </div>
    )
  }
}