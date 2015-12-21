import React from 'react'
import { Roles } from 'actions/authActions'
import Util from 'util/util'

const Types = { //TODO: Share with server code
  CREATED: 'created',
  COMMENTED: 'commented',
  ASSIGNED_TO: 'assigned to',
  CHANGED_STATUS: 'status changed to'
}

export default class ActivityList extends React.Component {

  printActivities() {
    return this.props.issue.activities.map(this.printActivity.bind(this))
  }

  printActivity(activity) {
    const a = activity
    const type = Util.capitalise(a.type)
    const user = Util.capitalise(a.user.username)
    const createdAt = Util.timeFromNow(a.createdAt)
    const taggedUser = Util.capitalise(a.taggedUser ? a.taggedUser.username : '')
    const key = `act-${this.props.issue._id}${a.createdAt}${user}`

    switch (activity.type) {
      case Types.CREATED:
        return (
            <li key={key}>
              {type} by <a>{user}</a> {createdAt}<br/>
              <span className="comment">{a.content}</span>
            </li>
        )
      case Types.ASSIGNED_TO:
        return (
            <li key={key}>{type} <a>{taggedUser}</a> by <a>{user}</a> {createdAt}</li>
        )
      case Types.CHANGED_STATUS:
        return (
            <li key={key}>
              {type} <span className={`status-${a.content} status-sm`}>{a.content}</span> by
              <a> {user}</a> {createdAt}
            </li>
        )
    }
  }

  render() {
    const { issue } = this.props
    return (
        <tr className={`activity-list-visible-${issue.showDetails}`}>
          <td colSpan={1}></td>
          <td colSpan={4}>
            <div className="detail-title">{issue.title}</div>
            <ul className="items">
              {this.printActivities()}
            </ul>
          </td>
        </tr>
    )
  }
}