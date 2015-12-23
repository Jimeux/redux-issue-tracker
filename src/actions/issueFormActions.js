import IssueService from 'services/issueService'
import { updateIssue, ADD_ISSUE, ADD_ISSUE_ERROR } from 'actions/issueActions'

export const UPDATE_VALUE = 'UPDATE_VALUE'
export const SUBMIT_FORM = 'SUBMIT_FORM'
export const UPDATE_ERRORS = 'UPDATE_ERRORS'
export const RESET_FORM = 'RESET_FORM'
export const SUBMISSION_COMPLETED = 'SUBMISSION_COMPLETED'

export function updateValue(field, value, error) {
  return {type: UPDATE_VALUE, field, value, error}
}

export function updateErrors(errors) {
  return {type: UPDATE_ERRORS, errors}
}

export function resetForm() {
  return {type: RESET_FORM}
}

export function submitForm(formData) {
  return (dispatch, getState) => {

    dispatch({type: SUBMIT_FORM})

    IssueService.createIssue(formData, getState().auth.token,
        messages => {
          dispatch({type: SUBMISSION_COMPLETED, successful: false})
          //TODO: Display errors from server
          //dispatch({type: ADD_ISSUE_ERROR, messages})
        },
        issue => {
          dispatch({type: SUBMISSION_COMPLETED, successful: true})
          dispatch({type: ADD_ISSUE, issue})
        })
  }
}