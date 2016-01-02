import {
    UPDATE_VALUE, SUBMIT_FORM, SUBMISSION_COMPLETED, UPDATE_ERRORS, RESET_FORM
} from 'actions/issueFormActions'
import { RESET } from 'store/store'

const initialState = {
  values: {
    title: '',
    description: ''
  },
  errors: {
    title: null,
    description: null
  },
  submitting: false
}

export default function issueForm(state = initialState, action) {

  switch (action.type) {

    case UPDATE_VALUE:
      const newValue = {}
      newValue[action.field] = action.value
      const newError = {}
      newError[action.field] = action.error
      return updateState({
        values: Object.assign({}, state.values, newValue),
        errors: Object.assign({}, state.errors, newError)
      })

    case UPDATE_ERRORS:
      return updateState({
        errors: {
          title: action.errors.title,
          description: action.errors.description
        }
      })

    case SUBMIT_FORM:
      return updateState({submitting: true})

    case SUBMISSION_COMPLETED:
      if (action.successful)
        $('#modal-issue').modal('hide')
      return initialState

    case RESET_FORM:
      return initialState

    case RESET:
      return initialState

    default:
      return state
  }

  /** Functions */

  function updateState(updates) {
    return Object.assign({}, state, updates)
  }

}