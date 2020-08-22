import React, { useState, useEffect } from 'react';
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import axios from 'axios'
import { Patient, Diagnosis } from '../types'

const SinglePatientView = ({ id }: { id: string }) => {

  const [{ patients }, dispatch] = useStateValue();

  const [relevantPatient, setRelevantPatient] = useState(patients[id])
  const [ diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  //console.log('initial relevant patient: ', patients[id])
  //console.log('initial relevant patient: ', relevantPatient)

  const getPatient = async (id: string) => {
    //console.log('requesting patient with id: ', id)
    const response = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`)

    //const idOfNew = response.data.id
    //console.log('id of patient from server: ', idOfNew)

    //const match: Patient | undefined = patients[idOfNew]
    //console.log('match from local state: ', match)

    

    setRelevantPatient(response.data)

    return response.data
  }

  const getDiagnoses = async () => {
    //console.log('requesting patient with id: ', id)
    const response = await axios.get<Diagnosis[]>(`http://localhost:3000/api/diagnoses`)

    console.log('diagnoses: ', response.data )
    console.log('type: ', typeof response.data )
    //const arData = Array(response.data)
    
    setDiagnoses(response.data)

    return response.data
  }

  useEffect(() => {
    getPatient(id)
  }, [dispatch])

  useEffect(() => {
    getDiagnoses()
  }, [dispatch])

  //console.log('updated relevant patient: ', relevantPatient)

  if (!relevantPatient) {
    return (
      <div>
        <h2>No such patient found</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{relevantPatient.name} <Icon name={relevantPatient.gender === 'male' ? 'mars' : relevantPatient.gender === 'female' ? 'venus' : 'neuter'} /></h2>
      <div>ssn: {relevantPatient.ssn}</div>
      <div>occupation: {relevantPatient.occupation}</div>
      <h3>entries</h3>
      {relevantPatient.entries.map((e, i) =>
        <div key={i}>
          <div>{e.date} {e.description}</div>
          {e.diagnosisCodes ?
            <ul>
              {e.diagnosisCodes.map((dc,j) => <li key={j}>{dc} { diagnoses.find(d => d.code === dc) ? diagnoses.filter(d => d.code === dc)[0].name : null }</li>)}
            </ul> : null
          } 

        </div>
      )}
    </div>

  )

};

export default SinglePatientView;
