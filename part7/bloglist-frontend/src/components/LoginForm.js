import React from 'react'
import { setCredentials } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password }) => {

  const dispatch = useDispatch()

  return (
    <form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username-form"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => dispatch(setCredentials(target.value, password))}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          id="password-form"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => dispatch(setCredentials(username, target.value))}
        />
        <Button variant="primary" type="submit" id="loginButton">
          login
        </Button>
      </Form.Group>

    </form>
  )
}

export default LoginForm