import React, { useState, useEffect } from 'react';
import { useStateValue } from "../state";
import { Icon, Button, Modal, Segment  } from "semantic-ui-react";
import axios from 'axios'
import { Patient, Diagnosis, Entry } from '../types'
import SingleEntry from './SingleEntry';
import AddEntryForm from './AddEntryForm'

const SinglePatientView = ({ id }: { id: string }) => {

  const [{ patients }, dispatch] = useStateValue();

  const [relevantPatient, setRelevantPatient] = useState(patients[id])
  const [ diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Entry) => void;
    error?: string;
  }

  const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new enrty</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (data: Entry) => {
      console.log('trying to submit new entry')
    try {
      
       await axios.post<Entry>(
        `http://localhost:3000/api/patients/${id}/entries`,
        data
      );
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
      return
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      {relevantPatient.entries.map((e, i) =>
        <SingleEntry entry={e} diagnoses={diagnoses} key={i}/>
      )}
    </div>

  )

};

export default SinglePatientView;
