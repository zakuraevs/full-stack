import React, { useState, useEffect } from 'react';
import { useStateValue } from "../state";
import { Icon, Button, Modal, Segment  } from "semantic-ui-react";
import axios from 'axios'
import { Patient, Diagnosis, Entry, EntryNoId } from '../types'
import SingleEntry from './SingleEntry';
import AddEntryForm from './AddEntryForm'
import { setPatients } from "../state/reducer"


const SinglePatientView = ({ id }: { id: string }) => {

  const [{ patients }, dispatch] = useStateValue();

  const [ relevantPatient, setRelevantPatient] = useState(patients[id])
  const [ diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Entry) => void;
    error?: string;
    diagnoses: Diagnosis[];
  }

  const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new enrty</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
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
      
       await axios.post<EntryNoId>(
        `http://localhost:3000/api/patients/${id}/entries`,
        data
      );

      //const patient = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`)

      dispatch({type: "ADD_PATIENT", payload: {...relevantPatient, entries: relevantPatient.entries.concat(data)}});
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();

      const { data: updPatients } = await axios.get<Patient[]>(
        `http://localhost:3000/api/patients`
      )
      console.log({ type: "SET_PATIENT_LIST", payload: updPatients })

      dispatch(setPatients(updPatients))

      setRelevantPatient(relevantPatient)

      getPatient(id)

      console.log(relevantPatient)
      console.log('success')
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
    console.log('DATA: ', response.data)

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
    console.log('using getPatient')
    getPatient(id)
    getDiagnoses()
  }, [])

  /*React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `http://localhost:3000/api/patients`
        );
        dispatch(setPatients(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);*/
  

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
        diagnoses={diagnoses}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      {relevantPatient.entries ? relevantPatient.entries.map((e, i) =>
        <SingleEntry entry={e} diagnoses={diagnoses} key={i}/>
      ) : null}
    </div>

  )

};

export default SinglePatientView;
