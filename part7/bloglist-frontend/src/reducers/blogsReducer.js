const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return //action.filter
        case 'NEW_BLOG':
            return //
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        filter,
    }
}

export default reducer