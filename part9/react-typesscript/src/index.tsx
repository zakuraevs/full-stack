import React from "react";
import ReactDOM from "react-dom";
import { HeaderProps, ContentProps, TotalProps } from './Types'

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
};

const Content: React.FC<ContentProps> = ({courseParts}) => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  )
};

const Total: React.FC<TotalProps> = ({courseParts}) => {
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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