import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

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