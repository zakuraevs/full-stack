import React from 'react';

//Course component
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

//Subcomponents of the course
const Header = ( {name} ) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}
  
const Total = ({ parts }) => {
    var sum = parts.map(part => part.exercises).reduce((a, b) => a + b)
    return (
        <p>total of exercises {sum}</p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
  
export default Course
  
  