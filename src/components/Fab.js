import React from 'react'

export default class Fab extends React.Component {
  render() {
    return (
        <button type="button"
                id="issue-modal"
                className="btn-create"
                ref="modal"
                data-toggle="modal"
                data-target="#modal-issue">
          <img src="/public/images/ic_edit.png"/>
        </button>
    )
  }
}