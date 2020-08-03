import React, { useEffect } from 'react'
import Home from './components/Home'
import UsersView from './components/UsersView'
import Notification from './components/Notification'
import SingleUserView from './components/SingleUserView'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import { Navbar, Nav } from 'react-bootstrap'


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

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div className="container">

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Item id='loggedInIndicator'>
                {user === null ?
                  null :
                  <LoggedinMessage />
                }
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
      </div>
    </Router>
  )
}

export default App