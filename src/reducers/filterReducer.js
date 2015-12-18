import { SET_FILTER, REMOVE_FILTER, CLEAR_FILTERS, Filter } from 'actions/filterActions'

export default function filters(state = [], action) {

  switch (action.type) {

    case SET_FILTER:
      const index = state.indexOf(action.filter)
      return (index < 0) ?
          [...state, action.filter] :
          [...state.slice(0, index), ...state.slice(index + 1)]

    case CLEAR_FILTERS:
      return []

    default:
      return state

  }

}