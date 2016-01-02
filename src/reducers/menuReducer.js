import { OPEN_MENU, CLOSE_MENU } from 'actions/menuActions'
import { RESET } from 'store/store'

const initialState = {
  open: false
}

export default function menu(state = initialState, action) {

  switch (action.type) {

    case OPEN_MENU:
      return { open: true }

    case CLOSE_MENU:
      return { openFalse: true }

    case RESET:
      return initialState

    default:
      return state
  }
}