import UserService from 'services/UserService'

export const RECEIVE_EDITORS = 'RECEIVE_EDITORS'
export const SAVE_DETAILS = 'SAVE_DETAILS'

export const Roles = {
  USER: 0,
  EDITOR: 1,
  ADMIN: 2
}

export function fetchEditors() {
  return (dispatch, getState) => {
    UserService.getEditors(getState().auth.token)
        .then(editors => dispatch(receiveEditors(editors)))
  }
}

export function receiveEditors(editors) {
  return {type: RECEIVE_EDITORS, editors}
}