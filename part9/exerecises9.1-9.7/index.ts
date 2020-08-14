import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

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

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})