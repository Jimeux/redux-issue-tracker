import React from 'react'
import Header from './Header.js'
import './../styles/core.scss'

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header loggedIn={true} />
      </div>
    )
  }
}