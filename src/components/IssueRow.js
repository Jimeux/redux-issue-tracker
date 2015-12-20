import React from 'react'
import { Roles } from 'actions/authActions'
import Util from 'util/util'

export default class IssueRow extends React.Component {

  handleSelection(event, issueId) {
    this.props.selectIssue(issueId, event.target.checked)
  }

  render() {
    const {issue, showDescription, createVote, userId} = this.props
    const resolved = issue.resolved ? 'Resolved' : issue.assignee === null ? 'New' : 'Unresolved'
    const checkAllFn = (e) => this.handleSelection(e, issue._id)
    const summary = `Created ${Util.timeFromNow(issue.createdAt)} by ${issue.creatorName}`

    return (
        <tbody className={`row-selected-${issue.selected}`}>
        <tr>
          <td className="checkbox-cell">
            <input onChange={checkAllFn} type="checkbox" checked={!!issue.selected}/>
          </td>

          <td className="status-cell">
            <div className={`status-${resolved.toLowerCase()}`}>
              {resolved}
            </div>
            <div className="assignee">
              {issue.assignee ? Util.capitalise(issue.assignee.username) : 'Unassigned'}
            </div>
          </td>

          <td className="title-cell" onClick={() => showDescription(issue._id, !issue.showDetails)}>
            <div className="title">{issue.title}</div>
            <div>{summary}</div>
          </td>

          <td className="vote-cell">
            <ActiveButton onClick={() => createVote(issue._id)} label="+1" active={issue.votes.includes(userId)}/>
            <button className="btn btn-xs btn-default btn-block btn-count">
              {issue.votes.length}
            </button>
          </td>
        </tr>

        <tr className={`footer-visible-${issue.showDetails}`}>
          <td colSpan={5}>
            <div className="detail-title">{issue.title}</div>
            <ul className="activity-list">
              {this.printDetails()}
            </ul>
          </td>
        </tr>
        </tbody>
    )
  }

  printDetails() {
    return this.props.issue.activities.map(this.printActivity)
  }

  printActivity(activity) {
    const Types = {
      CREATED: 'created',
      COMMENTED: 'commented',
      MARKED_AS: 'marked as',
      ASSIGNED_TO: 'assigned to',
      CHANGED_STATUS: 'status changed to'
    }

    const a = activity

    switch (activity.type) {
      case Types.CREATED:
        return (
            <li>
              {Util.capitalise(a.type)} by <a>{Util.capitalise(a.user.username)}</a> {Util.timeFromNow(a.createdAt)}<br/>
              <span className="comment">{a.content}</span>
            </li>
        )
      case Types.MARKED_AS:
        return (
            <li>
              {Util.capitalise(a.type)} {a.content} by <a>{Util.capitalise(a.user.username)}</a> {Util.timeFromNow(a.createdAt)}
            </li>
        )
      case Types.ASSIGNED_TO:
        return (
            <li>
              {Util.capitalise(a.type)} <a>{Util.capitalise(a.taggedUser ? a.taggedUser.username : '')}</a> by <a>{Util.capitalise(a.user.username)}</a> {Util.timeFromNow(a.createdAt)}
            </li>
        )
      case Types.CHANGED_STATUS:
        return (
            <li>
              {Util.capitalise(a.type)} <span className={`status-${a.content} status-sm`}>{a.content}</span> by <a>{Util.capitalise(a.user.username)}</a> {Util.timeFromNow(a.createdAt)}
            </li>
        )

    }

    return (
        <div>
          <strong>{Util.capitalise(a.type)}&nbsp;
            {a.taggedUser ? <a>{a.taggedUser.username}&nbsp;</a> : ''}
            by <a>{a.user.username}</a> {Util.timeFromNow(a.createdAt)}</strong><br/>
          {a.content}
        </div>)
  }
}

class ActiveButton extends React.Component {

  handleClick() {
    this.props.onClick()
    this.refs.btn.blur()
  }

  render() {
    const active = this.props.active ? 'active' : ''

    return <button className={`btn-plus-one btn btn-default btn-xs ${active}`}
                   ref="btn" onClick={() => this.handleClick()}>
      {this.props.label}
    </button>
  }
}