import Togglable from './Togglable'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { setCredentials } from '../reducers/loginReducer'
import { setUser } from '../reducers/userReducer'
import AddBlogForm from './AddBlogForm'
import { setMessage, removeMessage } from '../reducers/messageReducer'
import React, { useEffect, useRef } from 'react'
import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const credentials = useSelector(state => state.credentials)
    const user = useSelector(state => state.user)
    const message = useSelector(state => state.message)

    //checking local storage for logged in user info
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const username = credentials.username
            const password = credentials.password

            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            console.log('user: ', user)
            console.log('token :', user.token)

            dispatch(setUser(user))
            dispatch(setCredentials('', ''))

            dispatch(setMessage('Logged in successfuly'))
            setTimeout(() => {
                dispatch(removeMessage())
            }, 5000)
        } catch (exception) {
            console.log('wrong credentials')
            dispatch(setMessage('Wrong credentials'))
            setTimeout(() => {
                dispatch(removeMessage())
            }, 5000)
        }
    }

    const logOut = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        dispatch(setMessage('Logged out successfuly'))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }

    //deal with message
    const addBlog = (blogObject) => {
        dispatch(createBlog(blogObject))
        dispatch(setMessage('Successfuly created a new blog'))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }

    const incrementLikes = (blog) => {

        const blogObject = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }

        dispatch(updateBlog(blogObject, blog.id))
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <AddBlogForm
                createBlog={addBlog}
            />
        </Togglable>
    )

    const removeBlog = (blog) => {

        const prompt = window.confirm(`Delete the blog ${blog.title}?`)

        if (prompt) {
            dispatch(deleteBlog(blog.id))
            dispatch(setMessage('Successfuly removed the blog'))
            setTimeout(() => {
                dispatch(removeMessage())
            }, 5000)
        }

    }

    const sortedByLikes = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

    return (
        <div>
            <h2>Blogs</h2>

            <Notification message={message} />

            {user === null ?
                <LoginForm
                    handleLogin={handleLogin}
                    username={credentials.username}
                    password={credentials.password}
                /> :
                <div>
                    <p>{user.name} logged-in <button onClick={logOut}>log out</button></p>
                    {blogForm()}
                    <div id="blogs">
                        {sortedByLikes.map(blog =>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                user={user}
                                incrementLikes={() => incrementLikes(blog)}
                                deleteBlog={() => removeBlog(blog)}
                            />
                        )}
                    </div>
                </div>
            }
        </div>


    )


}

export default Home