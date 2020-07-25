const defaultNotif = 'Welcome to the Anecdotes page!'

const notificationReducer = (state = defaultNotif, action) => {
    switch (action.type) {
        case 'UPDATE_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = notification => {
    return {
        type: 'UPDATE_NOTIFICATION',
        notification,
    }
}

export default notificationReducer