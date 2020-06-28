import React from 'react';
import ReactDOM from 'react-dom';

const Header = ( {name} ) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Course = ({course}) => {
  const {id, name, parts} = course
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      {<Total parts={parts} />}
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))