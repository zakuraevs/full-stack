import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
import store from '../store'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterValue = store.getState().filter
  const anecdotes = useSelector(state => state.anecdotes
    .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    .filter(anecdote => anecdote.content.includes(filterValue))

  )

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
              dispatch(incrementVotes(anecdote.id))
              dispatch(addNotification(`You voted for "${anecdote.content}"`))
              setTimeout(() => {
                dispatch(removeNotification())
              }, 2000)
            }
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList