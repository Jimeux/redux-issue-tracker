import React from 'react'

export default class Header extends React.Component {
  render() {
    const onClick = (this.props.loggedIn) ?
        () => this.props.openMenu() : () => {}
    return (
        <header>
          <a className="brand" onClick={onClick}>
            {!this.props.loggedIn ? null :
                <img className="menu-icon" src="public/images/ic_menu.png"/>}
            I<small>SSUE</small> T<small>RACKER</small>
          </a>
        </header>
    )
  }
}