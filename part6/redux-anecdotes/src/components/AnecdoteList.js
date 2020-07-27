import React from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
import store from '../store'
import anecdoteService from '../services/anecdotes'

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

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  //const filterValue = store.getState().filter
  /*const anecdotes = useSelector(state => state.anecdotes
    .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    .filter(anecdote => anecdote.content.includes(filterValue))
  )*/

  return (
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={async () => {
            await anecdoteService.updateAnecdote(anecdote.content, anecdote.votes + 1, anecdote.id)
            dispatch(incrementVotes(anecdote.id))
            dispatch(addNotification(`you voted '${anecdote.content}'`, 5))
          }
          }
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  const anecdotes = state.anecdotes
    .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
    .filter(anecdote => anecdote.content.includes(state.filter))

  return {
    anecdotes: anecdotes,
    filter: state.filter
  }
}

const ConnectedNAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedNAnecdotes