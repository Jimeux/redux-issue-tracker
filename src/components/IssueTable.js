import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IssueHeader from 'components/IssueHeader'
import IssueRow from 'components/IssueRow'
import IssueEmpty from 'components/IssueEmpty'
import Fab from 'components/Fab'
import IssueForm from 'components/IssueForm'

import { Roles, fetchEditors } from 'actions/authActions'
import { selectIssues } from 'reducers/issueReducer'
import * as IssueActionCreators from 'actions/issueActions'
import * as IssueFormActionCreators from 'actions/issueFormActions'

class IssueTable extends React.Component {

  componentDidMount() {
    this.props.issueActions.fetchIssues()
    if (this.props.authState.role >= Roles.EDITOR)
      this.props.fetchEditors()
  }

  render() {
    const { issueFormState, issueState, authState} = this.props
    const { issueActions,issueFormActions } = this.props

    const rows = issueState.items.map((i) =>
        <IssueRow {...issueActions} {...authState} key={i._id} issue={i}/>)
    const emptyMsg = (rows.length <= 0) ? <IssueEmpty/> : null

    return (
        <ReactCSSTransitionGroup className="issue-table" transitionName="table"
                                 transitionAppear={true} transitionAppearTimeout={500}
                                 transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <Fab />
          <IssueForm {...issueFormActions} {...issueFormState}/>

          {/* TODO: Make this file IssueContainer.js and put this table into IssueTable.js */}
          <table className="issue-table">
            <IssueHeader {...issueActions} {...issueState} {...authState} />
            {rows}
            {emptyMsg}
          </table>

        </ReactCSSTransitionGroup>
    )
  }
}

function mapStateToProps(state) {
  const selected = {items: selectIssues(state.issues)}
  return {
    issueState: Object.assign({}, state.issues, selected),
    issueFormState: state.issueForm,
    authState: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    issueActions: bindActionCreators(IssueActionCreators, dispatch),
    issueFormActions: bindActionCreators(IssueFormActionCreators, dispatch),
    fetchEditors: () => dispatch(fetchEditors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueTable)