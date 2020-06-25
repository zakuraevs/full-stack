import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const numOFAnecdotes = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, increaseVote] = useState(new Array(numOFAnecdotes+1).join('0').split('').map(parseFloat))
  const [maxIndex, updateMax] = useState(votes.indexOf(Math.max(...votes)))

  const generateNumber = () => {
    const length = anecdotes.length
    var index = Math.floor( Math.random()*length )
    while(index === selected) {
      index = Math.floor( Math.random()*length )
    }
    setSelected(index)
  }

  const incrementVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    increaseVote(newVotes)
    updateMax(newVotes.indexOf(Math.max(...newVotes)))
    console.log(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={incrementVotes} text='vote' />
      <Button onClick={generateNumber} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[maxIndex]}</div>
      <div>has {votes[maxIndex]} vote(s)</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)