import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Label = ({parameter, value}) => {

  return (
    <div>
      {parameter} {value}
    </div>
  )  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const registerGood = () => {
    setGood(good + 1)
  }

  const registerNeutral = () => {
    setNeutral(neutral + 1)
  }

  const registerBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={registerGood} text='good' />
      <Button onClick={registerNeutral} text='neutral' />
      <Button onClick={registerBad} text='bad' />
      <h1>statistics</h1>
      <Label parameter={'good'} value={good} />
      <Label parameter={'neutral'} value={neutral} />
      <Label parameter={'bad'} value={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)