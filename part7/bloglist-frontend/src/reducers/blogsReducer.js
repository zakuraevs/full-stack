import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG': {
            const id = action.data.id
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
        }
        case 'DELETE_BLOG':
            return action.data
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = newObject => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'DELETE_BLOG',
            data: blogs
        })
    }
}

export const updateBlog = (newObject, id) => {
    return async dispatch => {
        const blog = await blogService.update(newObject, id)
        dispatch({
            type: 'UPDATE_BLOG',
            data: blog
        })
    }
}

export default blogsReducer