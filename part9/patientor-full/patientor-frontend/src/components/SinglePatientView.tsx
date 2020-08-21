import React, { useState, useEffect } from 'react';
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";
import axios from 'axios'
import { Patient } from '../types'

const SinglePatientView = ({id}: {id: string}) => {

  
  const [{ patients }, dispatch] = useStateValue();

  const [ relevantPatient, setRelevantPatient ] = useState(patients[id])

  console.log('initial relevant patient: ', patients[id])
  console.log('initial relevant patient: ', relevantPatient)

  const getPatient = async (id: string) => {
    console.log('requesting patient with id: ', id)
    const response = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`) 

    const idOfNew = response.data.id
    console.log('id of patient from server: ', idOfNew)

    const match: Patient | undefined = patients[idOfNew]
    console.log('match from local state: ', match)
    
    setRelevantPatient(response.data)

    return response.data

  } 
  useEffect(() => {
    getPatient(id)
  }, [])

  console.log('updated relevant patient: ', relevantPatient)

  
  return (
    <div>
       <h2>{relevantPatient.name} {relevantPatient.gender}</h2>
       <div>ssn: {relevantPatient.ssn}</div>
       <div>occupation: {relevantPatient.occupation}</div>
    </div>
   
  )

};

export default SinglePatientView;
