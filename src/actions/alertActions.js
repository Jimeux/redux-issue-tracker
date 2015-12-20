export const SET_ALERT = 'SET_ERROR'
export const CLEAR_ALERT = 'CLEAR_ALERT'

export function setAlert(message) {
  return {type: SET_ALERT, message}
}

export function clearAlert() {
  return {type: CLEAR_ALERT}
}