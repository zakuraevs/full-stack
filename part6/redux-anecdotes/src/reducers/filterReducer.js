
const defaultFilter = ''

const filterReducer = (state = defaultFilter, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER': 
            return action.filter
        default:
            return defaultFilter
    }
}

export const addFilter = filter => {
    return {
        type: 'UPDATE_FILTER',
        filter,
    }
}

export default filterReducer