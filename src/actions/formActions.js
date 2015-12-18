import fetch from 'isomorphic-fetch'
import Rest from 'helpers/rest'
import { updateIssue, ADD_ISSUE, ADD_ISSUE_ERROR } from 'actions/issueActions'

export const UPDATE_VALUE = 'UPDATE_VALUE'
export const SUBMIT_FORM = 'SUBMIT_FORM'
export const UPDATE_ERRORS = 'UPDATE_ERRORS'
export const SUBMISSION_COMPLETED = 'SUBMISSION_COMPLETED'

export function updateValue(field, value, error) {
  return { type: UPDATE_VALUE, field, value, error }
}

export function updateErrors(errors) {
  return { type: UPDATE_ERRORS, errors }
}

export function submitForm(formData) {
  return (dispatch, getState) => {

    dispatch({ type: SUBMIT_FORM })

    const token = getState().auth.token

    fetch('/issues', Rest.getOptions('POST', formData, token))
        .then((response) => {
          handleResponse(response,
              messages => {
                dispatch({type: SUBMISSION_COMPLETED, successful: false})
                //dispatch({type: ADD_ISSUE_ERROR, messages})
              },
              (issue) => {
                dispatch({type: SUBMISSION_COMPLETED, successful: true})
                dispatch({type: ADD_ISSUE, issue})
              })
        })
        .catch(console.log.bind(console))
  }
}

function handleResponse(response, onValidationError, onSuccess) {
  if (response.status === 401) {
    console.log('Please login')
    //dispatch({type: PROMPT_LOGIN}))
  } else if (response.status === 422) {
    response.json().then(onValidationError)
  } else if (response.status >= 200 && response.status < 300) {
    response.json().then(onSuccess)
  } else {
    console.log(`Unexpected error ${response.status}:`, response)
    //dispatch({type: UNEXPECTED_ERROR}))
  }
}