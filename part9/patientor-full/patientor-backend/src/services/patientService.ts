import patients from '../../data/patients.json';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: String(Math.max(Number(...patients.map(d => d.id))) + 1),
    ...patient
  };

patients.push(newPatient);
return newPatient;
};

export default {
  getPatients,
  addPatient
};