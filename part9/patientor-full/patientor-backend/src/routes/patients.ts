import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { Entry } from '../types'
import patients from '../../data/patients'

const router = express.Router();

router.get('/:id/entries', (req, res) => {
  
  const id = req.params.id

  const patient = patientService.getPatient(id)

  const entries = patient.entries

  if(entries) {
    res.json(entries)
  } else {
    res.status(404).json({error: 'patient not found'})
  }
  
})

router.get('/:id', (req, res) => {
  console.log('got request for URL', req.originalUrl)
  console.log('someone requested a patientt with id: ', req.params.id)

  const id = req.params.id

  const patient = patientService.getPatient(id)

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({error: 'patient not found'})
  }
})

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
})

router.post('/:id/entries', (req, res) => {
  
  const id = req.params.id

  const data = req.body

  console.log('data received: ', data)

  const validate = (entry: Entry) => {

    console.log(data.type)
    console.log(data.description)
    console.log(data.date)
    console.log(data.specialist)

    if(data.type && data.description && data.date && data.specialist ) {
      switch (data.type) {
        case 'HealthCheck': {
          if(data.healthCheckRating >= 0 && data.healthCheckRating <= 3) {
            console.log('were in the health check branch')
            return entry
          } else {
            console.log('were in the else branch 1')
            return undefined;
          }
        }
        case 'OccupationalHealthcare': {
          if(data.employerName) {
            console.log('were in the OccupationalHealthcare check branch')
            return entry
          } else {
            console.log('were in the else branch 2')
            return undefined;
          }
        }
        case 'Hospital': {
          if(data.discharge && data.discharge.date && data.discharge.criteria ) {
            console.log('were in the Hospital check branch')
            return entry
          } else {
            console.log('were in the else branch 3')
            return undefined;
          }
        }
        default:
          console.log('were in the default check branch')
          return undefined;
      }
    } else {
      console.log('were in the else branch 4')
      return undefined;
    }
    
  } 

  const validatedData = validate(data)

  const patient = patientService.getPatient(id)

  console.log('patient: ', patient)
  console.log('validatedData: ', validatedData)

  if( patient && validatedData) {
    const newEntry = {
      id: String(Math.max(Number(...patients.map(d => d.id))) + 1),
      ...validatedData
    }

    console.log('old patient entries: ', patient.entries)
    console.log('new entry: ', newEntry)
    patient.entries.push(newEntry)
    console.log('updated patient entries: ', patient.entries)

    res.status(200).json(newEntry)
  } else {
    res.status(400).json({error: 'bad request'})
  }
  
})

router.post('/', (req, res) => {
  try {
    console.log('request to add new patient')
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;