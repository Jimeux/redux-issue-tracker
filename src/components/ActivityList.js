import React from 'react'
import { Roles } from 'actions/authActions'
import { Status, Types } from 'constants'//'shared/constants'
import Util from 'util/util'

export default class ActivityList extends React.Component {

  printActivities() {
    return this.props.issue.activities.map(this.printActivity.bind(this))
  }

  printActivity(activity) {
    const a = activity
    const type = Util.capitalise(a.type)
    const user = Util.capitalise(a.user.username)
    const createdAt = Util.timeFromNow(a.createdAt)
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
        const taggedUser = Util.capitalise(a.taggedUser ? a.taggedUser.username : '')
        return (
            <li key={key}>{type} <a>{taggedUser}</a> by <a>{user}</a> {createdAt}</li>
        )
      case Types.CHANGED_STATUS:
        const status = Status[a.content]
        return (
            <li key={key}>
              {type} <span className={`status-${status ? status.toLowerCase() : ''} status-sm`}>{status}</span> by
              <a> {user}</a> {createdAt}
            </li>
        )
    }
  }

  render() {
    const { issue } = this.props
    return (
        <tr className={`activity-list-visible-${issue.showDetails}`}>
          <td colSpan={1}/>
          <td colSpan={4}>
            <ul className="items">
              {this.printActivities()}
            </ul>
          </td>
        </tr>
    )
  }
}