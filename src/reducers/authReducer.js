import { SAVE_DETAILS, RECEIVE_EDITORS } from 'actions/authActions'

export default function auth(state = {
  id: null,
  username: null,
  token: null,
  role: 1,
  editors: []
}, action) {
  const update = (obj) => Object.assign({}, state, obj)

  switch (action.type) {

    case SAVE_DETAILS:
      const { user_id, username, access_token, role } = action.hash
      return {
        id: user_id,
        editors: state.editors,
        username,
        token: access_token,
        role
      }

    case RECEIVE_EDITORS:
      return update({editors: action.editors})

    default:
      return state
  }
}