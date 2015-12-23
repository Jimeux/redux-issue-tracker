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
export const SET_FILTER = 'SET_FILTER'
export const SET_ASSIGNED = 'SET_ASSIGNED'

export const Order = {
  DATE: 'createdAt',
  TITLE: 'title',
  ASSIGNEE: 'assigneeName',
  STATUS: 'resolved',
  VOTES: 'voteCount'
}

export const Filter = {
  ALL: 'All Issues',
  NEW: 'New',
  UNASSIGNED: 'Unassigned',
  UNRESOLVED: 'Unresolved',
  RESOLVED: 'Resolved'
}

export function setFilter(filter) {
  return {type: SET_FILTER, filter}
}

export function setAssigned(id) {
  return {type: SET_ASSIGNED, id}
}

export function fetchIssues() {
  return (dispatch, getState) => {
    dispatch({type: REQUEST_ISSUES})

    IssueService.getIssues(1, getState().auth.token)
        .then(issues => dispatch({type: RECEIVE_ISSUES, issues}))
        .catch(error => dispatch({type: SET_ALERT, message: `Couldn't get issues`}))
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