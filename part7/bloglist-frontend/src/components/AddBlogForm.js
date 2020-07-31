import React, { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (

    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Password"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">submit blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm