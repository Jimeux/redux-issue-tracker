import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IssueHeader from 'components/IssueHeader'
import IssueRow from 'components/IssueRow'
import IssueEmpty from 'components/IssueEmpty'

export default class IssueTable extends React.Component {

  render() {
    const { issueState, issueActions, authState } = this.props

    const { pageUp, pageDown } = this.props.issueActions

    const rows = issueState.items.map((i) =>
        <IssueRow {...issueActions} {...authState} key={i._id} issue={i}/>)
    const emptyMsg = (rows.length <= 0) ? <IssueEmpty/> : null

    return (
        <table className="issue-table">
          <IssueHeader {...issueState} {...issueActions} {...authState}/>
          {rows}
          {emptyMsg}
          <tbody>
          <tr>
            <td colSpan={5}>
              <div className="btn-group">
                <button className="btn btn-default" onClick={() => pageDown()}>Previous</button>
                <button className="btn btn-default">{issueState.page}</button>
                <button className="btn btn-default" onClick={() => pageUp()}>Next</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
    )
  }
}