import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import issues from 'reducers/issueReducer'
import filters from 'reducers/filterReducer'
import auth from 'reducers/authReducer'
import issueForm from 'reducers/issueFormReducer'
import loginForm from 'reducers/loginFormReducer'
import alert from 'reducers/alertReducer'

const rootReducer = combineReducers({
  filters, issues, auth, issueForm, loginForm, alert
})

const createStoreWithMiddleware = applyMiddleware(
//    createLogger(),
    thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store