import { State } from "./state";
import { Patient } from "../types";
import axios from 'axios'

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state;
  }
};

export const setPatients = (data: any): Action => {
  return {
    //const patients = await axios.get<Patient[]>(
    //  `http://localhost:3000/api/patients`
    //);

      type: 'SET_PATIENT_LIST',
      payload: data

  }
}

export const addPatient = (newObject: any) => {
  return async (dispatch: (arg0: { type: string; data: any; }) => void) => {
    dispatch({
      type: 'ADD_PATIENT',
      data: newObject,
    })
  }
}
