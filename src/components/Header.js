import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
        <header>
          <span style={{float: 'left'}}>Issue Tracker</span>
          {!this.props.loggedIn ? null :
            <span style={{float: 'right'}}>
              <button type="button" id="issue-modal" className="btn btn-danger" ref="modal"
                      data-toggle="modal" data-target="#modal-issue">
                Create Issue
              </button>
              </span>}
        </header>
    )
  }
}