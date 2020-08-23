import { State } from "./state";
import { Patient } from "../types";


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
  }
  | {
    type: "ADD_ENTRY";
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
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatients = (data: any): Action => {
  return {
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

export const addEntry = (newObject: any) => {
  return async (dispatch: (arg0: { type: string; data: any; }) => void) => {
    dispatch({
      type: 'ADD_ENTRY',
      data: newObject,
    })
  }
}
