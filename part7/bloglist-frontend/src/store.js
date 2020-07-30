import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'


const reducer = combineReducers({
    blogs: blogsReducer,
    credentials: loginReducer,
    user: userReducer,
    message: messageReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store