import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import LoggedinMessage from './LoggedinMessage'
import { initializeUsers } from '../reducers/usersReducer'

import {
  Link
} from 'react-router-dom'

const UsersView = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // !!! THIS IS REPEATED, NOT GOOD
  //checking local storage for logged in user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    console.log('test')
  }, [dispatch])

  // !!! this might be needed
  /*useEffect(() => {
    userService
      .getAll()
      .then(data => {
        setUsers(data)
      })
  }, [])*/

  return (
    <div>
      {user === null ?
        <div>pelase log in to see user information</div> :
        <div>
          <LoggedinMessage />
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>user name</th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>


        </div>
      }

    </div>
  )
}

export default UsersView