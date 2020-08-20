import React from "react";
import ReactDOM from "react-dom";
import {
  HeaderProps, ContentProps, TotalProps, PartProps,
  /*CoursePartBase, CoursePartOne, CoursePartTwo,
  CoursePartThree,*/ CoursePart
} from './Types'

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
};

const Part: React.FC<PartProps> = ({ part }) => {
  
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <br/>
          {part.name} {part.exerciseCount} <br/>
          {part.description} 
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <br/>
          {part.name} {part.exerciseCount}
          {part.groupProjectCount}
          {}
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <br/>
          {part.name} {part.exerciseCount} <br/>
          {part.description} <br/>
          {part.exerciseSubmissionLink}
        </div>
      );
      case 'Banging your head against a wall':
        return (
          <div>
            <br/>
            {part.name} {part.exerciseCount} <br/>
            {part.description} <br/>
            {part.confusionLevel}
          </div>
        );
    default:
        return null;
  }
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {

  /*const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };*/

  return (
    <div>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  )

};

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
};


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Banging your head against a wall",
      exerciseCount: 27,
      description: "Confusing chapter",
      confusionLevel: 10
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));