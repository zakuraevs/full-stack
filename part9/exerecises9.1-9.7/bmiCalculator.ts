interface BMIValues {
  weight: number;
  height: number;
}

export const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  console.log(args[2])
  console.log(args[3])

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]) 
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (weight: number, height: number): string => {

  const heightInMeters = height * 0.01
  const bmi = (weight / ( heightInMeters * heightInMeters))
  console.log('weight: ', weight)
  console.log('height: ', heightInMeters)
  console.log('BMI: ', bmi)

  if (bmi <= 18.5) {
    return 'underweight'
  } else if (bmi > 18.5 && bmi <= 25) {
    return 'normal weight'
  } else if (bmi > 25 && bmi <= 30) {
    return 'overweight'
  } else if (bmi > 30) {
    return 'obese'
  } else {
    throw new Error('Parameters were incorrect!');
  }

}

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message); 
}
