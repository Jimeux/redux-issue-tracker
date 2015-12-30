import React from 'react'
import { Roles } from 'actions/authActions'
import { Status } from 'actions/filterActions'
import Util from 'util/util'
import ActivityList from 'components/ActivityList'

export default class IssueRow extends React.Component {

  handleSelection(event, issueId) {
    this.props.selectIssue(issueId, event.target.checked)
  }

  render() {
    const {issue, showDetails, createVote, userId} = this.props
    const status = Status[issue.status]
    const checkAllFn = (e) => this.handleSelection(e, issue._id)
    const summary = `Created ${Util.timeFromNow(issue.createdAt)} by ${issue.creatorName}`

    return (
        <tbody className={`issue-row selected-${issue.selected}`}>
        <tr>
          <td className="checkbox-cell">
            <input onChange={checkAllFn} type="checkbox" checked={!!issue.selected}/>
          </td>

          <td className="status-cell">
            <div className={`status-${status ? status.toLowerCase() : ''}`}>
              {status}
            </div>
            <div className="assignee">
              {issue.assignee ? Util.capitalise(issue.assignee.username) : 'Unassigned'}
            </div>
          </td>

          <td className="title-cell" onClick={() => showDetails(issue._id, !issue.showDetails)}>
            <div className="title">{issue.title}</div>
            <div>{summary}</div>
          </td>

          <VoteCell onClick={() => createVote(issue._id)}
                    active={issue.votes.includes(userId)}
                    votes={issue.votes.length}/>
        </tr>

        <ActivityList issue={issue}/>

        </tbody>
    )
  }
}

class VoteCell extends React.Component {

  handleClick() {
    this.props.onClick()
    this.refs.btn.blur()
  }

  render() {
    const active = this.props.active ? 'active' : ''

    return (
        <td className="vote-cell">
          <button className={`btn-plus-one btn btn-default btn-xs ${active}`}
                  ref="btn" onClick={() => this.handleClick()}>
            +1
          </button>
          <button className="btn btn-xs btn-default btn-block btn-count">
            {this.props.votes}
          </button>
        </td>
    )
  }
}