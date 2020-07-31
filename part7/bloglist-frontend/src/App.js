import React from 'react'
import Home from './components/Home'
import UsersView from './components/UsersView'
import Notification from './components/Notification'
import SingleUserView from './components/SingleUserView'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>

      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <h2>Blogs</h2>
      <Notification  />
      <Switch>
        <Route path='/users/:id'>
          <SingleUserView />
        </Route>
        <Route path='/users'>
          <UsersView />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App