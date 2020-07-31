import React, { useEffect } from 'react'

import LoggedinMessage from './LoggedinMessage'

import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { initializeUsers } from '../reducers/usersReducer'


const SingleUserView = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)


  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const id = useParams().id

  /*console.log('id: ', id)
  console.log('type of id: ', typeof(Number(id)))
  console.log('users: ', users)
  console.log('ids: ', users.map(u => u.id))*/

  const userToDisplay = users.find(u => String(u.id) === String(id))
  //console.log('u to isplay: ', userToDisplay)

  return (
    <div>
      {user === null ?
        <div>pelase log in to see user information</div> :
        <div>
          <LoggedinMessage />
          {userToDisplay ?
            <div>
              <h2>{userToDisplay.name}</h2>
              <h3>added blogs</h3>
              <ul>
                {userToDisplay.blogs.map(b =>
                  <li key={b.id}>{b.title}</li>
                )}
              </ul>
            </div> :
            <h3>No user with such id exists int he database</h3>


          }

        </div>
      }

    </div>
  )


}

export default SingleUserView

