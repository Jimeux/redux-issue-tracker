import { replacePath } from 'redux-simple-router'

import UserService from 'services/UserService'
import { SET_ALERT } from 'actions/alertActions'

export const RECEIVE_EDITORS = 'RECEIVE_EDITORS'
export const SAVE_DETAILS = 'SAVE_DETAILS'
export const LOG_OUT = 'LOG_OUT'

export const Roles = {
  USER: 0,
  EDITOR: 1,
  ADMIN: 2
}

export function fetchEditors() {
  return (dispatch, getState) => {
    UserService.getEditors(getState().auth.token)
        .then(editors => dispatch(receiveEditors(editors)))
        .catch(error => dispatch({type: SET_ALERT, message: `Couldn't get editors`}))
  }
}

export function logout() {
  return (dispatch, getState) => {
    UserService.logout(getState().auth.token)
      .catch(error => dispatch({type: SET_ALERT, message: `Error logging out`}))
    dispatch(replacePath('/login'))
  }
}

export function receiveEditors(editors) {
  return {type: RECEIVE_EDITORS, editors}
}
