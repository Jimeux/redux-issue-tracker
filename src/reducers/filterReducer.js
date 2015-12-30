import {
    SORT, SEARCH, Status, SET_STATUS, SET_ASSIGNED, CLEAR_FILTERS
} from 'actions/filterActions'

const initialState = {
  descending: true,
  sortField: 'createdAt',
  query: null,
  status: null,
  assignedTo: null
}

export default function filters(state = initialState, action) {
  switch (action.type) {

    case SORT:
      return updateState({sortField: action.sortField})

    case SET_STATUS:
      return updateState({status: action.status})

    case SET_ASSIGNED:
      return updateState({assignedTo: action.assignee})

    case SEARCH:
      return updateState({query: action.query || null})

    case CLEAR_FILTERS:
      return updateState({
        query: initialState.query,
        assignedTo: initialState.assignedTo,
        status: initialState.status
      })

    default:
      return state
  }

  /** Functions */

  function updateState(updates) {
    return Object.assign({}, state, updates)
  }
}