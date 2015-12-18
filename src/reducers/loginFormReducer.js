import {
    UPDATE_LOGIN_VALUE, SUBMIT_LOGIN_FORM, UPDATE_LOGIN_ERRORS,
    RESET_LOGIN_FORM, LOGIN_SUBMIT_COMPLETE
} from 'actions/loginFormActions'

const initialState = {
  values: {
    username: '',
    password: ''
  },
  errors: {
    username: '',
    password: ''
  },
  submitting: false
}

export default function loginForm(state = initialState, action) {

  switch (action.type) {

    case UPDATE_LOGIN_VALUE:
      const value = {} ; value[action.field] = action.value
      const error = {} ; error[action.field] = action.error
      return updateState({
        values: Object.assign({}, state.values, value),
        errors: Object.assign({}, state.errors, error)
      })

    case UPDATE_LOGIN_ERRORS:
      return updateState({
        errors: {
          username: action.errors.username,
          password: action.errors.password
        }
      })

    case SUBMIT_LOGIN_FORM:
      return updateState({submitting: true})

    case LOGIN_SUBMIT_COMPLETE:
      return updateState({submitting: false})

    case RESET_LOGIN_FORM:
      return initialState

    default:
      return state
  }

  /** Functions */

  function updateState(updates) {
    return Object.assign({}, state, updates)
  }

}