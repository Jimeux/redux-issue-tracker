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
export const SEARCH = 'SEARCH'
export const SORT = 'SORT'
export const SET_STATUS = 'SET_STATUS'
export const SET_ASSIGNED = 'SET_ASSIGNED'
export const PAGE_UP = 'PAGE_UP'
export const PAGE_DOWN = 'PAGE_DOWN'

export const Order = {
  DATE: 'createdAt',
  TITLE: 'title',
  ASSIGNEE: 'assigneeName',
  STATUS: 'resolved',
  VOTES: 'voteCount'
}

export const Status = [
  'Unresolved',
  'Resolved'
]

export function setStatus(status) {
  return (dispatch, getState) => {
    dispatch({type: SET_STATUS, status})
    getIssues(dispatch, getState())
  }
}

export function setAssigned(assignee) {
  return (dispatch, getState) => {
    dispatch({type: SET_ASSIGNED, assignee})
    getIssues(dispatch, getState())
  }
}

export function pageDown() {
  return {type: PAGE_DOWN }
}

export function pageUp() {
  return (dispatch, getState) => {
    dispatch({type: PAGE_UP })

    const perPage = getState().auth.perPage
    const page = getState().issues.page

    if (getState().issues.items.length <= page * perPage - perPage)
      getIssues(dispatch, getState())
  }
}

function getIssues(dispatch, state) {
  dispatch({type: REQUEST_ISSUES})

  const assignee = (state.issues.assignedTo != null) ? state.issues.assignedTo._id : null
  const status = (state.issues.status != null) ? state.issues.status : null
  const perPage = state.auth.perPage

  IssueService.getIssues(state.auth.token, state.issues.page, perPage, assignee, status)
      .then(issues => dispatch({type: RECEIVE_ISSUES, issues}))
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

export function sort(order) {
  return {type: SORT, order}
}

export function search(query) {
  return {type: SEARCH, query}
}

export function selectIssue(id, checked) {
  return {type: SELECT_ISSUE, id, checked}
}

export function selectAll(items, checked) {
  return {type: SELECT_ALL, items, checked}
}