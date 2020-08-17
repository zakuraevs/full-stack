interface exerciseData {
  exerciseTimes: number[];
  target: number;
}

interface ExerciseOutcome {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgs = (args: Array<string>): exerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const dailyArgs = args
  const dailyArgsNums = dailyArgs.slice(3).map(a => Number(a))

  if (!dailyArgsNums.some(e => isNaN(e)) && !isNaN(Number(args[2]))) {
    return {
      exerciseTimes: dailyArgsNums,
      target: Number(args[2])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
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
      rating = 1
      break
    case 1:
      rating = 2
      break
    default: rating = 3
  }

  switch(rating) {
    case 1: 
      description = 'poor performance'
      break
    case 2:
      description = 'goof that you tried, but you can do more'
      break
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

try {
  const { target, exerciseTimes } = parseArgs(process.argv);
  console.log( calculateExercises(exerciseTimes, target) );
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}