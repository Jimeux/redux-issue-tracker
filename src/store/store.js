import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routeReducer } from 'redux-simple-router'
//import createLogger from 'redux-logger'

import issues from 'reducers/issueReducer'
import filters from 'reducers/filterReducer'
import auth from 'reducers/authReducer'
import issueForm from 'reducers/issueFormReducer'
import loginForm from 'reducers/loginFormReducer'
import alert from 'reducers/alertReducer'
import menu from 'reducers/menuReducer'

const rootReducer = combineReducers({
  filters, issues, auth, issueForm, loginForm, alert, menu,
  routing: routeReducer
})

const createStoreWithMiddleware = applyMiddleware(
//    createLogger(),
    thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store