import fetch from 'isomorphic-fetch'
import Rest from 'helpers/rest'

export const RECEIVE_EDITORS = 'RECEIVE_EDITORS'
export const SAVE_DETAILS = 'SAVE_DETAILS'

export const Roles = {
  USER: 0,
  EDITOR: 1,
  ADMIN: 2
}

export function fetchEditors() {
  return (dispatch, getState) => {
    const token = getState().auth.token
    const options = { headers: Rest.headers(token) }

    fetch('/users/editors', options)
        .then(response => response.json())
        .then(json => dispatch(receiveEditors(json)))
  }
}

export function receiveEditors(editors) {
  return {type: RECEIVE_EDITORS, editors}
}