import React from 'react'

const AddBlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {

    return (
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
            <button type="submit">submit article</button>
        </form>
    )
}

export default AddBlogForm