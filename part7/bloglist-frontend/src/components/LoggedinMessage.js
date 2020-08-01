import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setMessage, removeMessage } from '../reducers/messageReducer'


const LoggedinMessage = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)


  const logOut = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    dispatch(setMessage('Logged out successfuly'))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return (
    <div className="menuItem">{user.name} logged-in <button onClick={logOut}>log out</button></div>
  )

}

export default LoggedinMessage