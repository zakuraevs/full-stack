import React from 'react';
import ReactDOM from 'react-dom';

const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>     
    </div>
  )
}

const Part = (course) => {
  return(
    <div>
      <p>{course.part} {course.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises}/>
      <Part part={parts[1].name} exercises={parts[1].exercises}/>
      <Part part={parts[2].name} exercises={parts[2].exercises}/>
    </div>  
  )  
}

const Total = (parts) => {
  return (
    <div>
      <p>Number of exercises {parts.exercises1 + parts.exercises2 +parts.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
 
}

ReactDOM.render(<App />, document.getElementById('root'))
