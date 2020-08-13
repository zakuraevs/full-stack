
const calculateBmi = (weight: number, height: number): string => {

  const bmi = weight / (height * height) * 703

  if (bmi <= 18.5) {
    return 'underweight'
  } else if (bmi > 18.5 && bmi <= 25) {
    return 'normal weight'
  } else if (bmi > 25 && bmi <= 30) {
    return 'noverweight'
  } else if (bmi > 30) {
    return 'obese'
  } else {
    throw new Error('PArameters were incorrect!');
  }

}

console.log(calculateBmi(180, 74))