import { SAVE_DETAILS, RECEIVE_EDITORS } from 'actions/authActions'

export default function auth(state = {
  id: "56618b1c360ab7b31ea3dad5",
  username: null, //TODO: REMOVE
  token: "Xry5sikESIKggBjsUArm1R2CwGNASLqcJtVT2lNeSnHWlk7wUywSGU5XaAjUh3ohO91l6LWznFmqCPCgqNI4PmvQn40Dz57NeLJIc85IRpGz74Ozd1mDvUQSsQEudFIt1QoPRiNq0u2dQsyiGCNB4KI5tJl66hC51EOflZEG0SuEHVtzU5ExJcv71U0JfLl5MIVMArhbOslLQHfGYmYodQTWmRkQShF7SSLEu3HY6cJC25dPnwbgFyPOndctSXW9",
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