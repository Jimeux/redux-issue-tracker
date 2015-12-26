import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IssueHeader from 'components/IssueHeader'
import IssueRow from 'components/IssueRow'
import IssueEmpty from 'components/IssueEmpty'

export default class IssueTable extends React.Component {

  render() {
    const { issueState, issueActions, authState } = this.props
    const rows = issueState.items.map((i) =>
        <IssueRow {...issueActions} key={i._id} issue={i}/>)
    const emptyMsg = (rows.length <= 0) ? <IssueEmpty/> : null

    return (
          <table className="issue-table">
            <IssueHeader {...issueState} {...issueActions} {...authState}/>
            {rows}
            {emptyMsg}
          </table>
    )
  }
}