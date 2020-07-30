import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogsReducer'
import { setCredentials } from './reducers/loginReducer'
import { setUser } from './reducers/userReducer'




const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const credentials = useSelector(state => state.credentials)
  const user = useSelector(state => state.user)


  //const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  //checking local storage for logged in user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      //setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //CREDENTIALS USED HERE
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
      //setUsername('')
      //setPassword('')
      setMessage('Logged in successfuly')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('wrong credentials')
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    setMessage('Logged out successfuly')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  //deal with message
  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  const incrementLikes = (blog) => {

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    dispatch(updateBlog(blogObject, blog.id))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <AddBlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const removeBlog = (blog) => {

    const prompt = window.confirm(`Delete the blog ${blog.title}?`)

    if (prompt) {
      dispatch(deleteBlog(blog.id))
    }

  }

  const sortedByLikes = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message} />

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={credentials.username}
          //setUsername={setUsername}
          password={credentials.password}
          //setPassword={setPassword}
        /> :
        <div>
          <p>{user.name} logged-in <button onClick={logOut}>log out</button></p>
          {blogForm()}
          <div id="blogs">
            {sortedByLikes.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                incrementLikes={() => incrementLikes(blog)}
                deleteBlog={() => removeBlog(blog)}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App