import { SET_ALERT, CLEAR_ALERT } from 'actions/alertActions'

export default function alerts(state = null, action) {

  switch (action.type) {

    case SET_ALERT:
      return action.message

    case CLEAR_ALERT:
      return null

    default:
      return state
  }
}