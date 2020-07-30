import React from 'react'
import { setCredentials } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ handleLogin, username, password }) => {

    const dispatch = useDispatch()

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
          <input
                    id="username-form"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => dispatch(setCredentials(target.value, password))}
                />
            </div>
            <div>
                password
          <input
                    id="password-form"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => dispatch(setCredentials(username, target.value))}
                />
            </div>
            <button id="login-submit-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm