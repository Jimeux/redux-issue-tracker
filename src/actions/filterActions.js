import { getIssues } from 'actions/issueActions'

export const SEARCH = 'SEARCH'
export const SORT = 'SORT'
export const SET_STATUS = 'SET_STATUS'
export const SET_ASSIGNED = 'SET_ASSIGNED'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

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
    getIssues(dispatch, getState(), true)
  }
}

export function setAssigned(assignee) {
  return (dispatch, getState) => {
    dispatch({type: SET_ASSIGNED, assignee})
    getIssues(dispatch, getState(), true)
  }
}

export function sort(order) {
  return {type: SORT, order}
}

export function search(query) {
  return (dispatch, getState) => {
    const cleared = getState().filters.query && !query

    dispatch({type: SEARCH, query})

    if (cleared || query.length > 2)
      getIssues(dispatch, getState(), true)
  }
}

export function clearFilters() {
  return (dispatch, getState) => {
    dispatch({type: CLEAR_FILTERS})
    getIssues(dispatch, getState())
  }
}