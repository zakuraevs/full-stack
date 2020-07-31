import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  blogs: blogsReducer,
  credentials: loginReducer,
  user: userReducer,
  message: messageReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store