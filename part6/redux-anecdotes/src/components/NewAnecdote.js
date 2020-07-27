import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
//import { addNotification, removeNotification } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote
}

const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdote