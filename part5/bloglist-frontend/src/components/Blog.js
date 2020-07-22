import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = () => {

    const prompt = window.confirm(`Delete the blog ${blog.title}?`)

    if(prompt) {
      blogService
        .remove(blog.id)
        .then(() => {
          blogService
            .getAll()
            .then(blogs =>
              setBlogs(blogs)
            )
        })
    }

  }

  const incrementLikes = async () => {

    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blogObject, blog.id)

    const refresh = await blogService.getAll()

    setBlogs(refresh)

  }

  //console.log('user of blog: ', blog.user)
  //console.log('user: ', user)

  return (
    <div style={blogStyle}>
      {visible ?
        <div>
          {blog.title} <button onClick={() => setVisible(!visible)}>hide</button><br />
          {blog.url}<br />
          {blog.likes} <button onClick={incrementLikes}>like</button><br />
          {blog.author}<br />
          {((blog.user.id === user.id) || (blog.user === user.id)) ?<button onClick={deleteBlog} style={{ background: 'red' }}>delete</button> : null}
        </div> :
        <div>
          <div>{blog.title} <button onClick={() => setVisible(!visible)}>view</button></div>
        </div>
      }

    </div >
  )

}


export default Blog
