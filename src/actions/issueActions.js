import fetch from 'isomorphic-fetch'
import Rest from 'helpers/rest'
import { SUBMIT_FORM, SUBMISSION_COMPLETED } from 'actions/issueFormActions'
import { SET_ALERT, CLEAR_ALERT } from 'actions/alertActions'

export const ADD_ISSUE = 'ADD_ISSUE'
export const ADD_ISSUE_ERROR = 'ADD_ISSUE_ERROR'
export const SELECT_ISSUE = 'SELECT_ISSUE'
export const SELECT_ALL = 'SELECT_ALL'
export const UPDATE_SINGLE = 'UPDATE_SINGLE'
export const UPDATE_MANY = 'UPDATE_MANY'
export const REQUEST_ISSUES = 'REQUEST_ISSUES'
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES'
export const SHOW_DESC = 'SHOW_DESC'
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

    const token = getState().auth.token

    fetch('/issues', {headers: Rest.headers(token)})
        .then(response => response.json())
        .then(json =>
          dispatch({type: RECEIVE_ISSUES, issues: json.issues}))
  }
}

export function updateIssues(issues, field, value, update) {
  return (dispatch, getState) => {
    const token = getState().auth.token

    issues = issues
        .filter(i => i.selected)
        .map(i => i._id)

    fetch(`/issues`, Rest.getOptions('PATCH', {issues, field, value}, token))
        .then(response => response.json()) //TODO: errors
        .then(json => {
          dispatch({type: UPDATE_MANY, updated: json.issues})
        })
        .catch(error => {
          console.log(error);
          dispatch({type: SET_ALERT, message: `Couldn't update issue(s)`})
        })
  }
}

export function createVote(issue) {
  return (dispatch, getState) => {
    const token = getState().auth.token

    fetch(`/issues/${issue}/plusone`, Rest.getOptions('POST', {}, token))
        .then(response => response.json())
        .then(issue => dispatch(updateIssue(issue)))
        .catch(() => {
          dispatch({type: SET_ALERT, message: `Couldn't register vote`})
        })
  }
}

export function updateIssue(issue) {
  return {type: UPDATE_SINGLE, issue}
}

export function showDescription(issueId, show) {
  return {type: SHOW_DESC, issueId, show}
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