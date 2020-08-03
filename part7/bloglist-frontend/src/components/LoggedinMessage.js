import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setMessage, removeMessage } from '../reducers/messageReducer'
import { Button } from 'react-bootstrap'


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
    <div className="menuItem" id="loggedInText">{user.name} logged-in <Button variant="outline-primary" size="sm" onClick={logOut} id="logOutButton">log out</Button></div>
  )

}

export default LoggedinMessage