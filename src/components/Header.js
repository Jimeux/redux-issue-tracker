import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
        <header>
          <a className="brand">
            <img src="public/images/ic_menu.png" height="24px" width="24px"
            style={{marginBottom: 2, marginRight: 10}}/>
            I<small>SSUE</small> T<small>RACKER</small>
          </a>
        </header>
    )
  }
}