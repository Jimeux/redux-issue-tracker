import {
    ADD_ISSUE, ADD_ISSUE_ERROR, REQUEST_ISSUES, RECEIVE_ISSUES, SHOW_DESC, UPDATE_SINGLE,
    SORT, SEARCH, SELECT_ALL, SELECT_ISSUE, SET_FILTER, UPDATE_MANY, Filter, SET_ASSIGNED
} from 'actions/issueActions'

const initialState = {
  isFetching: false,
  descending: true,
  items: [],
  query: null,
  filter: Filter.ALL,
  assignedTo: ''
}

export default function issues(state = initialState, action) {
  const { descending, items } = state

  switch (action.type) {

    case UPDATE_MANY:
      return updateState({
        items: items.map(i => {
          if (action.ids.includes(i._id)) {
            i[action.field] = action.update
          }
          return i
        })
      })

    case ADD_ISSUE:
      return updateState({items: [action.issue, ...items]})

    case SORT:
      return updateState({
        items: items.sort(sortIssues(action.order, descending)),
        descending: !descending
      })

    case REQUEST_ISSUES:
      return updateState({isFetching: true})

    case RECEIVE_ISSUES:
      return updateState({
        isFetching: false,
        items: action.issues
      })

    case SELECT_ISSUE:
      return updateState({
        items: updateItem(action.id, 'selected', action.checked)
      })

    case SHOW_DESC:
      return updateState({
        items: updateItem(action.issueId, 'showDetails', action.show)
      })

    case UPDATE_SINGLE:
      const updateIndex = findItemIndex(action.issue._id)
      const showDetails = items[updateIndex].showDetails
      return updateState({
        items: updateItem(action.issue._id, 'showDetails', showDetails, action.issue)
      })

    case SELECT_ALL:
      const selectIds = action.items.map(i => i._id)
      return updateState({
        items: items.map(i => {
          if (selectIds.includes(i._id))
            i.selected = action.checked
          return i
        })
      })

    case SET_FILTER:
      return updateState({
        filter: action.filter,
        items: items.map(i => {
          i.selected = false
          return i
        })
      })

    case SET_ASSIGNED:
      return updateState({
        assignedTo: action.id,
        items: items.map(i => {
          i.selected = false
          return i
        })
      })

    case SEARCH:
      return updateState({
        query: action.query,
        items: items.map(i => {
          i.selected = false
          return i
        })
      })

    default:
      return state
  }

  /** Functions */

  function updateState(updates) {
    return Object.assign({}, state, updates)
  }

  function findItemIndex(issueId) {
    return items.findIndex((i) => i._id === issueId)
  }

  function updateItem(id, field, value, newIssue) {
    const index = findItemIndex(id)
    const issue = newIssue || items[index]
    const updates = {}
    updates[field] = value
    return [
      ...items.slice(0, index),
      Object.assign({}, issue, updates),
      ...items.slice(index + 1)
    ]
  }

  function sortIssues(field, descending) {
    return (a, b) => {
      if (descending) [a, b] = [b, a]

      a = a[field]
      b = b[field]

      if (a instanceof String) {
        a = a.toUpperCase()
        b = b.toUpperCase()
      }

      return (a < b) ? -1 : (a > b) ? 1 : 0
    }
  }
}

export function selectIssues(state) {
  let { items, filter, query, assignedTo } = state

  if (filter === Filter.UNASSIGNED)
    items = items.filter(issue => issue.selected || !issue.assignee)
  else if (filter === Filter.UNRESOLVED)
    items = items.filter(issue => issue.selected || !issue.resolved)
  else if (filter === Filter.RESOLVED)
    items = items.filter(issue => issue.selected || issue.resolved)
  else if (filter === Filter.NEW)
    items = items.filter(issue => issue.selected || (!issue.resolved && !issue.assignee))

  if (assignedTo)
    items = items.filter(issue => issue.selected ||
    (issue.assignee && issue.assignee._id === assignedTo._id))

  if (query !== null) {
    query = query.toUpperCase()
    items = items.filter((i) => {
      return i.title.toUpperCase().includes(query) ||
          (!i.assignee && Filter.UNASSIGNED.includes(query)) ||
          (i.assignee && i.assignee.username.toUpperCase().includes(query))
    })
  }
  return items
}