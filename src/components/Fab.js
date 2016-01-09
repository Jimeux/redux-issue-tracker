import React from 'react'

export default class Fab extends React.Component {
  render() {
    return (
        <button type="button"
                onClick={() => this.props.onClick()}
                className="btn-create">
          <img src="/public/images/ic_edit.png"/>
        </button>
    )
  }
}