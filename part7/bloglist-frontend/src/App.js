import React from 'react'
import Home from './components/Home'
import UsersView from './components/UsersView'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {

  // !!! this should be moved to the Notification component
  const message = useSelector(state => state.message)

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
      <Notification message={message} />
      <Switch>
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