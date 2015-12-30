import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingView from 'components/LoadingView'
import Fab from 'components/Fab'
import IssueTable from 'components/IssueTable'
import IssueForm from 'components/IssueForm'

import { fetchEditors, Roles } from 'actions/authActions'
import { selectIssues } from 'reducers/issueReducer'
import * as IssueActionCreators from 'actions/issueActions'
import * as FilterActionCreators from 'actions/filterActions'
import * as IssueFormActionCreators from 'actions/issueFormActions'

class IssuesRoute extends React.Component {

  componentDidMount() {
    this.props.issueActions.fetchIssues()
    if (this.props.authState.role >= Roles.EDITOR)
      this.props.fetchEditors()
  }

  render() {
    const { issueFormState, issueState, filterState, authState } = this.props
    const { issueActions, filterActions, issueFormActions, fetchEditors } = this.props
    const issueTableProps = {issueActions, issueState, filterState, filterActions, authState, fetchEditors}

    const body = (
        <div>
          <Fab />
          <IssueForm {...issueFormActions} {...issueFormState}/>
          <IssueTable {...issueTableProps} />
        </div>
    )

        /*<ReactCSSTransitionGroup transitionName="table"
    transitionAppear={true} transitionAppearTimeout={500}
    transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {body}
  </ReactCSSTransitionGroup>*/

    return (
        <div>
          {issueState.isFetching ? <LoadingView /> : null}
          {body}
        </div>
    )
  }
}

function mapStateToProps(state) {
  const selected = {items: selectIssues(state.issues, state.auth.perPage)}
  return {
    issueState: Object.assign({}, state.issues, selected),
    issueFormState: state.issueForm,
    filterState: state.filters,
    authState: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    issueActions: bindActionCreators(IssueActionCreators, dispatch),
    filterActions: bindActionCreators(FilterActionCreators, dispatch),
    issueFormActions: bindActionCreators(IssueFormActionCreators, dispatch),
    fetchEditors: () => dispatch(fetchEditors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssuesRoute)