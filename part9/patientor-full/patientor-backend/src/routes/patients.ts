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
    if(data.type && data.description && data.date && data.specialist ) {
      switch (data.type) {
        case 'HealthCheck': {
          if(data.healthCheckRating) {
            return entry
          } 
          break;
        }
        case 'OccupationalHealthcare': {
          if(data.employerName) {
            return entry
          }
          break;
        }
        case 'Hospital': {
          if(data.discharge && data.discharge.date && data.discharge.criteria ) {
            return entry
          }
          break;
        }
        default:
          return undefined;
      }
    }
    return undefined
  }

  const validatedData = validate(data)

  

  const patient = patientService.getPatient(id)

  if(patient && validatedData) {
    const newEntry = {
      id: String(Math.max(Number(...patients.map(d => d.id))) + 1),
      ...validatedData
    }

    patient.entries.concat(newEntry)
    res.status(200).json(newEntry)
  } else {
    res.status(400).json({error: 'bad request'})
  }
  
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;