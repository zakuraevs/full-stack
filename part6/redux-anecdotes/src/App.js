import React from 'react'
import Anecdotes from './components/Anecdotes'

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

/*{anecdotes.map(anecdote =>
  <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={ dispatch(incrementVotes(anecdote.id)) }>vote</button>
    </div>
  </div>
)}*/

export default App