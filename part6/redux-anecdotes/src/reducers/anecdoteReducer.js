import anecdoteService from '../services/anecdotes'
import { addNotification, removeNotification } from '../reducers/notificationReducer'


const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'INCREMENT_VOTES': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

//action creators
export const createAnecdote = (content) => {
  console.log('CREATED NEW ANECDOTE THRU REDUCER')
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    await dispatch(addNotification('Created new anecdote', 5))

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })

    
  }

}

export const incrementVotes = (id) => {
  return {
    type: 'INCREMENT_VOTES',
    data: { id }
  }
}

export default anecdoteReducer