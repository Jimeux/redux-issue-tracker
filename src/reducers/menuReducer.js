import { OPEN_MENU, CLOSE_MENU } from 'actions/menuActions'

const initialState = {
  open: false
}

export default function menu(state = initialState, action) {

  switch (action.type) {

    case OPEN_MENU:
      return { open: true }

    case CLOSE_MENU:
      return { openFalse: true }

    default:
      return state
  }
}