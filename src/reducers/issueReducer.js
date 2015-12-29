import {
    ADD_ISSUE, ADD_ISSUE_ERROR, REQUEST_ISSUES, RECEIVE_ISSUES, SHOW_DETAILS, UPDATE_SINGLE, UPDATE_MANY,
    SORT, SEARCH, SELECT_ALL, SELECT_ISSUE, PAGE_UP, PAGE_DOWN,
    Status, SET_STATUS, SET_ASSIGNED
} from 'actions/issueActions'

const initialState = {
  isFetching: true,
  page: 1,
  descending: true,
  items: [],
  query: null,
  status: null,
  assignedTo: null
}

export default function issues(state = initialState, action) {
  const { descending, items, page } = state

  switch (action.type) {

    case UPDATE_MANY:
      return updateState({
        items: items.map(item => {
          const found = action.updated.find(issue => issue._id === item._id)
          if (found) {
            found.selected = item.selected
            found.showDetails = item.showDetails
          }
          return (found) ? found : item
        })
      })

    case ADD_ISSUE:
      return updateState({items: [action.issue, ...items]})

    case PAGE_UP:
      return updateState({page: page + 1})

    case PAGE_DOWN:
      return updateState({page: page > 1 ? page - 1 : 1})

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
        items: action.reset ? action.issues : [...items, ...action.issues],
        page: action.reset ? 1 : page
      })

    case SELECT_ISSUE:
      return updateState({
        items: updateItem(action.id, 'selected', action.checked)
      })

    case SHOW_DETAILS:
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

    case SET_STATUS:
      return updateState({status: action.status})

    case SET_ASSIGNED:
      return updateState({assignedTo: action.assignee})

    case SEARCH:
      return updateState({query: action.query})

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

export function selectIssues(state, perPage = 10) {
  const start = (state.page * perPage) - perPage
  return state.items.slice(start, start + perPage)
}