import IssueService from 'services/issueService'
import { SET_ALERT } from 'actions/alertActions'

export const ADD_ISSUE = 'ADD_ISSUE'
export const ADD_ISSUE_ERROR = 'ADD_ISSUE_ERROR'
export const SELECT_ISSUE = 'SELECT_ISSUE'
export const SELECT_ALL = 'SELECT_ALL'
export const UPDATE_SINGLE = 'UPDATE_SINGLE'
export const UPDATE_MANY = 'UPDATE_MANY'
export const REQUEST_ISSUES = 'REQUEST_ISSUES'
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES'
export const SHOW_DETAILS = 'SHOW_DETAILS'

export const PAGE_UP = 'PAGE_UP'
export const PAGE_DOWN = 'PAGE_DOWN'

export function pageDown() {
  return {type: PAGE_DOWN}
}

export function pageUp() {
  return (dispatch, getState) => {
    dispatch({type: PAGE_UP})

    const perPage = getState().auth.perPage
    const page = getState().issues.page

    if (getState().issues.items.length <= page * perPage - perPage)
      getIssues(dispatch, getState(), false)
  }
}

export function getIssues(dispatch, state, reset) {
  dispatch({type: REQUEST_ISSUES})

  const assignee = (state.filters.assignedTo != null) ? state.filters.assignedTo._id : null
  const status = (state.filters.status != null) ? state.filters.status : null
  const search = (state.filters.query != null) ? state.filters.query : null
  const perPage = state.auth.perPage

  IssueService.getIssues(state.auth.token, state.issues.page, perPage, assignee, status, search)
      .then(json => dispatch({
        type: RECEIVE_ISSUES,
        issues: json.issues,
        count: json.count,
        reset
      }))
      .catch(error => dispatch({type: SET_ALERT, message: `Couldn't get issues`}))
}

export function fetchIssues() {
  return (dispatch, getState) => {
    getIssues(dispatch, getState())
  }
}

export function updateIssues(issues, field, value, update) {
  return (dispatch, getState) => {
    issues = issues
        .filter(i => i.selected)
        .map(i => i._id)

    IssueService.patchIssues(issues, field, value, getState().auth.token)
        .then(issues => dispatch({type: UPDATE_MANY, updated: issues}))
        .catch(error => dispatch({type: SET_ALERT, message: `Couldn't update issue(s)`}))
  }
}

export function createVote(issue) {
  return (dispatch, getState) => {
    IssueService.createVote(issue, getState().auth.token)
        .then(issue => dispatch(updateIssue(issue)))
        .catch(error => dispatch({type: SET_ALERT, message: `Couldn't register vote`}))
  }
}

export function updateIssue(issue) {
  return {type: UPDATE_SINGLE, issue}
}

export function showDetails(issueId, show) {
  return {type: SHOW_DETAILS, issueId, show}
}

export function selectIssue(id, checked) {
  return {type: SELECT_ISSUE, id, checked}
}

export function selectAll(items, checked) {
  return {type: SELECT_ALL, items, checked}
}