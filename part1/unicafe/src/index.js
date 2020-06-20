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

const Statistics = ({good, neutral, bad, all, sum}) => {

  const division = (a, b) => {
    if(b === 0) return 0
    return a/b 
  }

  const getPercent = (value) => {
    return value * 100 + ' %'
  }

  if(all === 0) return( 
    <div>
      No feedback given
    </div>
  )


  return (
    <div>
      <Label parameter={'good'} value={good} />
      <Label parameter={'neutral'} value={neutral} />
      <Label parameter={'bad'} value={bad} />
      <Label parameter={'all'} value={all} />
      <Label parameter={'average'} value={division(sum, all)} />
      <Label parameter={'positive'} value={getPercent(division(good, all)) } />
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setAverage] = useState(0)

  const registerGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(sum + 1)
  }

  const registerNeutral = () => {
    setNeutral(neutral + 1)
    setAll(sum + 1)
  }

  const registerBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(sum - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={registerGood} text='good' />
      <Button onClick={registerNeutral} text='neutral' />
      <Button onClick={registerBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral ={neutral} bad={bad} all={all} sum={sum} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)