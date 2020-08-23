import React, { useState, useEffect } from 'react';
import { useStateValue } from "../state";
import { Icon, Button, Modal, Segment  } from "semantic-ui-react";
import axios from 'axios'
import { Patient, Diagnosis, Entry, EntryNoId } from '../types'
import SingleEntry from './SingleEntry';
import AddEntryForm from './AddEntryForm'
import AddHospitalEntryForm from './AddHospitalEntryForm'
import AddOCEntryForm from './AddOCEntryForm'
import { setPatients } from "../state/reducer"


const SinglePatientView = ({ id }: { id: string }) => {

  const [{ patients }, dispatch] = useStateValue();

  const [ relevantPatient, setRelevantPatient] = useState(patients[id])
  const [ diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const [HCModalOpen, setHCModalOpen] = useState<boolean>(false);
  const [HoModalOpen, setHoModalOpen] = useState<boolean>(false);
  const [OHModalOpen, setOHModalOpen] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();

  interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Entry) => void;
    error?: string;
    diagnoses: Diagnosis[];
    entryType: string;
  }

  const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses, entryType }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new {entryType} entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {entryType === 'health check' ? <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} /> :
          entryType === 'hospital' ? <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} /> :
          <AddOCEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} /> }
      </Modal.Content>
    </Modal>
  );

  const openHCModal = (): void => setHCModalOpen(true);
  const openHoModal = (): void => setHoModalOpen(true);
  const openOHModal = (): void => setOHModalOpen(true);

  const closeHCModal = (): void => {
    setHCModalOpen(false);
    setError(undefined);
  };
  const closeHoModal = (): void => {
    setHoModalOpen(false);
    setError(undefined);
  };
  const closeOHModal = (): void => {
    setOHModalOpen(false);
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
      closeHCModal();
      closeHoModal();
      closeOHModal();

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

  const getPatient = async (id: string) => {
    const response = await axios.get<Patient>(`http://localhost:3000/api/patients/${id}`)

    console.log('DATA: ', response.data)

    setRelevantPatient(response.data)

    return response.data
  }

  const getDiagnoses = async () => {
    const response = await axios.get<Diagnosis[]>(`http://localhost:3000/api/diagnoses`)

    console.log('diagnoses: ', response.data )
    console.log('type: ', typeof response.data )
    
    setDiagnoses(response.data)

    return response.data
  }

  useEffect(() => {
    console.log('using getPatient')
    getPatient(id)
    getDiagnoses()
  }, [])


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
        modalOpen={HCModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHCModal}
        diagnoses={diagnoses}
        entryType={'health check'}
      />
      <Button onClick={() => openHCModal()}>Add New Health Check Entry</Button>
      <AddEntryModal
        modalOpen={HoModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHoModal}
        diagnoses={diagnoses}
        entryType={'hospital'}
      />
      <Button onClick={() => openHoModal()}>Add New Hospital Entry</Button>
      <AddEntryModal
        modalOpen={OHModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeOHModal}
        diagnoses={diagnoses}
        entryType={'occupational health'}
      />
      <Button onClick={() => openOHModal()}>Add New OC Entry</Button>

      {relevantPatient.entries ? relevantPatient.entries.map((e, i) =>
        <SingleEntry entry={e} diagnoses={diagnoses} key={i}/>
      ) : null}
    </div>

  )

};

export default SinglePatientView;
