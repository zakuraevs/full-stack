import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import LoggedinMessage from './LoggedinMessage'
import { setMessage, removeMessage } from '../reducers/messageReducer'




const Blog = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  //const [visible, setVisible] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => String(b.id) === String(id))
  const user = useSelector(state => state.user)

  //console.log('blogs: ', blogs)
  console.log('blog: ', blog)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const incrementLikes = () => {

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log('blog object: ', blogObject)

    dispatch(updateBlog(blogObject, blog.id))
  }

  const removeBlog = () => {

    const prompt = window.confirm(`Delete the blog ${blog.title}?`)

    if (prompt) {
      dispatch(deleteBlog(blog.id))
      dispatch(setMessage('Successfuly removed the blog'))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }

  }


  return (
    <div>
      {user === null ?
        <div>pelase log in to see user information</div> :
        <div>
          {blog ?
            <div>
              <h1>{blog.title}</h1>
              url: <a href={blog.url}>{blog.url}</a><br />
              {blog.likes} likes <button onClick={incrementLikes}>like</button><br />
              added by {blog.author}<br />
              {((blog.user && user) && ((blog.user.id === user.id) || (blog.user === user.id))) ? <button onClick={removeBlog} style={{ background: 'red' }}>delete</button> : null}
            </div> :
            <h3>No post with such id exists int he database</h3>
          }
        </div>
      }
    </div>
  )

}


export default Blog
