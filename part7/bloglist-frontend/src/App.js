import React, { useEffect } from 'react'
import Home from './components/Home'
import UsersView from './components/UsersView'
import Notification from './components/Notification'
import SingleUserView from './components/SingleUserView'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'


import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import LoggedinMessage from './components/LoggedinMessage'

const App = () => {

  const dispatch = useDispatch()


  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  return (
    <Router>

      <div id='menuDiv'>
        <div className="menuItem"><Link to="/" >home</Link></div>
        <div className="menuItem"><Link to="/users" >users</Link></div>
        {user === null ?
          null :
          <LoggedinMessage />
        }
      </div>
      <h2>Blogs</h2>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <SingleUserView />
        </Route>
        <Route path='/users'>
          <UsersView />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App