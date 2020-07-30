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



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(( { blogs } ) => {
    return blogs
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  //checking local storage for logged in user info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log('user: ', user)
      console.log('token :', user.token)

      setUser(user)
      setUsername('')
      setPassword('')
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
    setUser(null)
    setMessage('Logged out successfuly')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  //deal with message
  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
  }

  //temporarily disabled
  const incrementLikes = (blog) => {

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    dispatch(updateBlog(blogObject, blog.id))

    //await blogService.update(blogObject, blog.id)

    //const refresh = await blogService.getAll()

    //setBlogs(refresh)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <AddBlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  //temporarily disabled
  const removeBlog = (blog) => {

    const prompt = window.confirm(`Delete the blog ${blog.title}?`)

    if (prompt) {
      dispatch(deleteBlog(blog.id))
      //blogService
      //  .remove(blog.id)
      //  .then(() => {
      //    blogService
      //      .getAll()
      //      .then(blogs =>
      //        setBlogs(blogs)
      //      )
      //  })
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
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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