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
                        type="text"
                        value={title}
                        name="Username"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                <input
                        type="text"
                        value={author}
                        name="Password"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                <input
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