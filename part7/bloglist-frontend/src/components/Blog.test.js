import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'test blog',
        author: 'sergo',
        url: 'bbb.com',
        likes: 20
    }

    // method 1
    const component = render(
        <Blog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
        'test blog'
    )
    expect(component.container).not.toHaveTextContent(
        'sergo'
    )
    expect(component.container).not.toHaveTextContent(
        'bbb.com'
    )
    expect(component.container).not.toHaveTextContent(
        '20'
    )


})

test('extra content is rendered when view is clicked', () => {

    const blog = {
        title: 'test blog',
        author: 'sergo',
        url: 'bbb.com',
        likes: 20
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        'test blog'
    )
    expect(component.container).toHaveTextContent(
        'sergo'
    )
    expect(component.container).toHaveTextContent(
        'bbb.com'
    )
    expect(component.container).toHaveTextContent(
        '20'
    )

})

test('if like button is clicked twice, event handler is called twice', () => {

    const blog = {
        title: 'test blog',
        author: 'sergo',
        url: 'bbb.com',
        likes: 20,
        user: {
            id: 'testID'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} incrementLikes={mockHandler}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    //for(let i = 0; i < 3; i++) {
        //fireEvent.click(likeButton)
    //}

    component.debug()

    expect(mockHandler.mock.calls).toHaveLength(2)





})