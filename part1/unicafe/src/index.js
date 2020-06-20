import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Helper functions for calculating statistics:
//Used with Statistics component version and table version
const division = (a, b) => {
  if(b === 0) return 0
  return a/b 
}

const getPercent = (value) => {
  return value * 100 + ' %'
}

//Components
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

//Following two components can be used instead of the HTML table
//Currently unused
const Statistic = ({parameter, value}) => {
  return (
    <div>
      {parameter} {value}
    </div>
  )  
}

//Unused due to table implementtion
const Statistics = ({good, neutral, bad, all, sum}) => {

  if(all === 0) return( 
    <div>
      No feedback given
    </div>
  )

  return (
    <div>
      <Statistic parameter={'good'} value={good} />
      <Statistic parameter={'neutral'} value={neutral} />
      <Statistic parameter={'bad'} value={bad} />
      <Statistic parameter={'all'} value={all} />
      <Statistic parameter={'average'} value={division(sum, all)} />
      <Statistic parameter={'positive'} value={getPercent(division(good, all)) } />
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
    setAll(all + 1)
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
      <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{division(sum, all)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{getPercent(division(good, all))}</td>
        </tr>
      </table>
      {/*Statistic component version below: */}
      {/*<Statistics good={good} neutral ={neutral} bad={bad} all={all} sum={sum} />*/}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)