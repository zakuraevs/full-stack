
export interface HeaderProps {
  courseName: string;
}

export interface PartProps {
  part: CoursePart;
}

export interface ContentProps {
  courseParts: Array<CoursePart>;
}

export interface TotalProps {
  courseParts: Array<CoursePart>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
  //description: string;
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  //description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartDescription {
  name: "Banging your head against a wall";
  confusionLevel: number;
}

export type CoursePart =  CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
