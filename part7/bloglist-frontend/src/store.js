import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
//import noteReducer from './reducers/noteReducer'
//import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    credentials: loginReducer
    //password:
    //user:
    //message

})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store