const initialState = {
    username: '',
    password: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CREDENTIALS':
            return action.data
        default:
            return state
    }
}

export const setCredentials = (username, password) => {
    return {
        type: 'SET_CREDENTIALS',
        data: {
            username: username,
            password: password
        }
    }
}

export default loginReducer