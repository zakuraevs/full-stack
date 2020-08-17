import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {

  try {

  const query = req.query
  console.dir('QUERY: ', query)

  const result = {
    weight: query.weight,
    height: query.height,
    bmi: calculateBmi(Number(query.weight), Number(query.height))
  }

  res.json(result)

} catch {
  
  res.status(400).json({
    error: 'icorrect query format'
  })
  throw new Error('icorrect query format')
}

})


app.post('/exercises', (req, res) => {

  try {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const times: number[] = req.body.daily_exercises
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target

  if(!target || !times ) {
    res.status(400).json({
      error: 'parameters missing'
    })
    throw new Error('parameters missing')
  }


  console.log("INCLUDES NOT A NUM: ", times.every(a => !isNaN(a)) )

  console.log(typeof times[0])

  if( isNaN(target) ||  !times.every(a => !isNaN(a))) {
    res.status(400).json({
      error: 'malformatted parameters'
    })
    throw new Error('malformatted parameters')
  }

  const result = calculateExercises(times, target)

  res.json(result)
  } catch (e) {

    res.status(400).json({
      error: 'bad data format'
    })
    throw new Error('bad data format')

  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})