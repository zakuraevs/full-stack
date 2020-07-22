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


    component.debug()

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