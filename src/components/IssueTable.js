import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IssueHeader from 'components/IssueHeader'
import IssueRow from 'components/IssueRow'
import { Roles, fetchEditors } from 'actions/authActions'
import { selectIssues } from 'reducers/issueReducer'
import * as IssueActionCreators from 'actions/issueActions'

export default class IssueTable extends React.Component {

  componentDidMount() {
    this.props.issueActions.fetchIssues()
    if (this.props.authState.role >= Roles.EDITOR)
      this.props.fetchEditors()
  }

  render() {
    const { issueActions, issueState, authState} = this.props
    const items = issueState.items
    const rows = items.map((i) => {
      return <IssueRow {...issueActions} {...authState} key={i._id} issue={i}/>
    })

    return (
        <table className="issue-table">
          <IssueHeader {...issueActions} {...issueState} {...authState} />
          {items.length > 0 ? null :
              <tbody>
              <tr className="no-issues">
                <td colSpan={5}>
                  <h3>No issues found...</h3>
                </td>
              </tr>
              </tbody>}
          {rows}
        </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    issueState: Object.assign({}, state.issues, {
      items: selectIssues(state.issues)
    }),
    authState: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    issueActions: bindActionCreators(IssueActionCreators, dispatch),
    fetchEditors: () => dispatch(fetchEditors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueTable)