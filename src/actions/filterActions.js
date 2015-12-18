export const SET_FILTER = 'SET_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const Filter = {
  ALL:        'ALL',
  UNASSIGNED: 'UNASSIGNED',
  UNRESOLVED: 'UNRESOLVED'
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function clearFilters() {
  return { type: CLEAR_FILTERS }
}