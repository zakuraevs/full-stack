const defaultNotif = null

const notificationReducer = (state = defaultNotif, action) => {
    switch (action.type) {
        case 'UPDATE_NOTIFICATION':
            return action.notification
        case 'REMOVE_NOTIFICATION':
            return defaultNotif
        default:
            return state
    }
}

export const addNotification = notification => {
    return {
        type: 'UPDATE_NOTIFICATION',
        notification,
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        defaultNotif,
    }
}


export default notificationReducer