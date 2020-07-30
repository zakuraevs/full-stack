import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
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

//what does data look like
export const createBlog = newObject => {
    return async dispatch => {
      const newBlog = await blogService.create(newObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    }
  }

export const deleteBlog = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default blogsReducer