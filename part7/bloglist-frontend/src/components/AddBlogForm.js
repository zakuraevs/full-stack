import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Password"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant="primary" type="submit" id="submitNewBlog">
            submit
          </Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default AddBlogForm