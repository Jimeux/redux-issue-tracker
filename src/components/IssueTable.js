import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IssueHeader from 'components/IssueHeader'
import IssueRow from 'components/IssueRow'
import IssueEmpty from 'components/IssueEmpty'

export default class IssueTable extends React.Component {

  render() {
    const { issueState, issueActions, authState, filterActions, filterState } = this.props

    const { pageUp, pageDown } = this.props.issueActions
    const { clearFilters } = this.props.filterActions

    const rows = issueState.items.map((i) =>
        <IssueRow {...issueActions} {...authState} key={i._id} issue={i}/>)
    const emptyMsg = (rows.length <= 0) ? <IssueEmpty clearFilters={clearFilters}/> : null

    return (
        <table className="issue-table">
          <IssueHeader {...issueState} {...issueActions} {...filterState} {...filterActions} {...authState}/>
          {rows}
          {emptyMsg}
          {issueState.count <= 0 ? null :
          <Pagination {...issueState} perPage={authState.perPage}
                                      pageUp={pageUp}
                                      pageDown={pageDown}/>}
        </table>
    )
  }
}

class Pagination extends React.Component {
  render() {
    const { page, count, perPage, pageUp, pageDown } = this.props
    const from = (page - 1) * perPage + 1
    const to = (perPage * page > count) ? count : perPage * page

    return (
        <tbody>
        <tr>
          <td colSpan={5}>
            <div className="btn-group">
              <button className="btn btn-default"
                      disabled={page === 1}
                      onClick={() => pageDown()}>Previous</button>
              <button className="btn btn-default">
                <span>{from}-{to} of {count}</span>
              </button>
              <button className="btn btn-default"
                      disabled={page * perPage >= count}
                      onClick={() => pageUp()}>Next</button>
            </div>
          </td>
        </tr>
        </tbody>
    )
  }
}