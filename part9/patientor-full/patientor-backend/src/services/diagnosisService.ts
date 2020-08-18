import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDisgnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDisgnosis
};