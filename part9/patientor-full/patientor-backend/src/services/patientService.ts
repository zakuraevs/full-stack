import patients from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id): Patient | undefined => {
  const found: Array<Patient> = patients.filter(p => p.id === id)
if (found.length > 0) {
  return found[0];
}

return undefined;

}

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: String(Math.max(Number(...patients.map(d => d.id))) + 1),
    ...patient
  };

  console.log('new id: ', String(newPatient.id))

patients.push(newPatient);
return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatient
};