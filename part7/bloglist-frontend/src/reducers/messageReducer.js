const messageReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'REMOVE_MESAGE':
            return action.message
        default:
            return state
    }
}

export const removeMessage = () => {
    return {
        type: 'REMOVE_MESAGE',
        message: null
    }
}

export const setMessage = message => {
    return {
        type: 'SET_MESSAGE',
        message,
    }
}

export default messageReducer