interface ExerciseOutcome {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseTimes: number[], target: number ): ExerciseOutcome => {

  const periodLength = exerciseTimes.length;
  const trainingDays = exerciseTimes.filter(d => d !== 0).length;
  let rating;
  let description;
  const average = exerciseTimes.reduce((a, b) => a+ b)/periodLength
  const success = average >= target;
  
  switch(trainingDays) {
    case 0: 
      rating = 1;
    case 1:
      rating = 2
    default: rating = 3
  }

  switch(rating) {
    case 1: 
      description = 'poor performance';
    case 2:
      description = 'goof that you tried, but you can do more'
    default: description = 'well done'
  }


  const result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: average
  }

  return result;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))