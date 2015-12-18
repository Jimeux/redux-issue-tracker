import fetch from 'isomorphic-fetch'
import Rest from 'helpers/rest'
import { SAVE_DETAILS } from 'actions/authActions'
import { SET_ALERT, CLEAR_ALERT } from 'actions/alertActions'

export const UPDATE_LOGIN_VALUE = 'UPDATE_LOGIN_VALUE'
export const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM'
export const UPDATE_LOGIN_ERRORS = 'UPDATE_LOGIN_ERRORS'
export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM'
export const LOGIN_SUBMIT_COMPLETE = 'LOGIN_SUBMIT_COMPLETE'

export function updateValue(field, value, error) {
  return { type: UPDATE_LOGIN_VALUE, field, value, error }
}

export function updateErrors(errors) {
  return { type: UPDATE_LOGIN_ERRORS, errors }
}

export function resetForm() {
  return { type: RESET_LOGIN_FORM }
}

export function submitLoginForm(formData) {
  return (dispatch) => {

    dispatch({ type: SUBMIT_LOGIN_FORM })

    const body = Rest.passwordGrant(formData.username, formData.password)
    const options = Rest.getOptions('POST', body)

    fetch('/oauth/token', options)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            response.json().then((oauthHash) => {
              dispatch({type: CLEAR_ALERT})
              dispatch({type: SAVE_DETAILS, hash: oauthHash})
            })
          } else {
            dispatch({type: SET_ALERT, message: 'Incorrect username or password'})
            dispatch({type: LOGIN_SUBMIT_COMPLETE})
          }
        })
        .catch(console.log.bind(console))
  }
}