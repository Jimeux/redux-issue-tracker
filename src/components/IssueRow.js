import React from 'react';
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
    const summary = `Posted ${Util.timeFromNow(issue.createdAt)} by ${issue.creatorName}`

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
            <button className="btn btn-xs btn-default btn-block">
              {issue.votes.length}
            </button>
          </td>
        </tr>

        <tr className={`footer-visible-${issue.showDetails}`}>
          <td colSpan={2}/>
          <td colSpan={3}>
            {issue.description}
          </td>
        </tr>
        </tbody>
    );
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