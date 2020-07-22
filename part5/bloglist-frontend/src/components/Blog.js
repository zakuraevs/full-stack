import React, { useState } from 'react'

const Blog = ({ blog, user, incrementLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle}>
      {visible ?
        <div>
          {blog.title} <button onClick={() => setVisible(!visible)}>hide</button><br />
          {blog.url}<br />
          {blog.likes} <button onClick={incrementLikes}>like</button><br />
          {blog.author}<br />
          { ( (blog.user && user) && ((blog.user.id === user.id) || (blog.user === user.id))) ?<button onClick={deleteBlog} style={{ background: 'red' }}>delete</button> : null}
        </div> :
        <div>
          <div>{blog.title} <button onClick={() => setVisible(!visible)}>view</button></div>
        </div>
      }

    </div >
  )

}


export default Blog
