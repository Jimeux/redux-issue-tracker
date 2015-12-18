import {
    UPDATE_VALUE, SUBMIT_FORM, SUBMISSION_COMPLETED, UPDATE_ERRORS
} from 'actions/formActions'

const initialState = {
  titleValue: '',
  titleError: null,
  descriptionValue: '',
  descriptionError: null,
  submitting: false
}

export default function form(state = initialState, action) {

  switch (action.type) {

    case UPDATE_VALUE:
      const updates = {}
      updates[`${action.field}Value`] = action.value
      updates[`${action.field}Error`] = action.error
      return updateState(updates)

    case UPDATE_ERRORS:
      return updateState({
        titleError: action.errors.title,
        descriptionError: action.errors.description
      })

    case SUBMIT_FORM:
      //TODO: Check for errors
      return updateState({
        submitting: true
      })

    case SUBMISSION_COMPLETED:
      if (action.successful)
        $('#modal-issue').modal('hide')
      return initialState

    default:
      return state
  }

  /** Functions */

  function updateState(updates) {
    return Object.assign({}, state, updates)
  }

}