import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () => {

    blogService
      .remove(blog.id)
      .then(returnedBlog => {
        blogService
          .getAll()
          .then(blogs =>
            setBlogs(blogs)
          )
      })

  }

  return (
    <div style={blogStyle}>
      {visible ?
        <div>
          {blog.title} <button onClick={() => setVisible(!visible)}>hide</button><br />
          {blog.url}<br />
          {blog.likes} <button>like</button><br />
          {blog.author}<br />
          <button onClick={deleteBlog} style={{background: "red"}}>DEV: delete</button>
        </div> :
        <div>
          <div>{blog.title} <button onClick={() => setVisible(!visible)}>view</button></div>
        </div>
      }

    </div >
  )

}

export default Blog
