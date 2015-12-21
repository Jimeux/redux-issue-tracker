import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
        <header>
          <a className="brand" onClick={() => this.props.openMenu()}>
            <img className="menu-icon" src="public/images/ic_menu.png"/>
            I<small>SSUE</small> T<small>RACKER</small>
          </a>
        </header>
    )
  }
}