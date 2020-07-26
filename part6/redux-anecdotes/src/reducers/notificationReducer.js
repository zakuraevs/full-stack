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

export const addNotification = (notification, duration) => {


    return async dispatch => {
        await dispatch({
            type: 'UPDATE_NOTIFICATION',
            notification,
        })
        setTimeout(() => {
            dispatch(removeNotification())
        }, duration * 1000)

    }


    /*return {
       type: 'UPDATE_NOTIFICATION',
       notification,
    }*/
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        defaultNotif,
    }
}


export default notificationReducer