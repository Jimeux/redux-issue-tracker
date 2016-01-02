import { SAVE_DETAILS, RECEIVE_EDITORS, Roles } from 'actions/authActions'
import { RESET } from 'store/store'
import Util from 'util/util'

const initialState = {
  userId: null,
  username: null,
  token: null,
  role: 0,
  editors: [],
  perPage: 10
}

export default function auth(state = initialState, action) {
  const update = (obj) => Object.assign({}, state, obj)

  switch (action.type) {

    case SAVE_DETAILS:
      const { user_id, username, access_token, role } = action.hash
      return {
        userId: user_id,
        editors: state.editors,
        perPage: 10,
        token: access_token,
        isEditor: role >= Roles.EDITOR,
        username: Util.capitalise(username),
        role
      }

    case RECEIVE_EDITORS:
      return update({editors: action.editors})

    case RESET:
      return initialState

    default:
      return state
  }
}