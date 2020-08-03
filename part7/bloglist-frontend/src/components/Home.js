import React, { useEffect, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from '../reducers/blogsReducer'
import { setCredentials } from '../reducers/loginReducer'
import { setUser } from '../reducers/userReducer'
import AddBlogForm from './AddBlogForm'
import { setMessage, removeMessage } from '../reducers/messageReducer'
import LoginForm from './LoginForm'

import { Table, Form, Button } from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const credentials = useSelector(state => state.credentials)
  const user = useSelector(state => state.user)

  //checking local storage for logged in user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = credentials.username
      const password = credentials.password

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log('user: ', user)
      console.log('token :', user.token)

      dispatch(setUser(user))
      dispatch(setCredentials('', ''))

      dispatch(setMessage('Logged in successfuly'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setMessage('Wrong credentials'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }

  /*const logOut = () => {
      window.localStorage.clear()
      dispatch(setUser(null))
      dispatch(setMessage('Logged out successfuly'))
      setTimeout(() => {
          dispatch(removeMessage())
      }, 5000)
  }*/

  //deal with message
  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setMessage('Successfuly created a new blog'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <AddBlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )



  const sortedByLikes = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  return (
    <div>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={credentials.username}
          password={credentials.password}
        /> :
        <div>
          <h2>Blogs</h2>
          {blogForm()}
          <Table striped>
            <tbody>
              {sortedByLikes.map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </td>
                  <td>
                    {blog.likes} likes
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      }
    </div>


  )


}

export default Home