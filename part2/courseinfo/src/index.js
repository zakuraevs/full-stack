import React from 'react';
import ReactDOM from 'react-dom';

const Header = ( {name} ) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  var sum = parts.map(part => part.exercises).reduce((a, b) => a + b)
  return(
    <p>total of exercises {sum}</p>
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
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Course = ({course}) => {
  const {name, parts} = course
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <strong><Total parts={parts} /></strong>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))