import userService from '../services/users'


const messageReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
      case 'SET_USERS':
        return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const setUsers = (users) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export default messageReducer