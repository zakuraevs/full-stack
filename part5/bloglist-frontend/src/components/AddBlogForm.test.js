import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> calls event handler it receives as props correctly', () => {

    const createBlog = jest.fn()

    const component = render(
        <AddBlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'title of blog' }
    })

    fireEvent.change(author, {
        target: { value: 'author of blog' }
    })

    fireEvent.change(url, {
        target: { value: 'url of blog' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title of blog')
    expect(createBlog.mock.calls[0][0].author).toBe('author of blog')
    expect(createBlog.mock.calls[0][0].url).toBe('url of blog')
})