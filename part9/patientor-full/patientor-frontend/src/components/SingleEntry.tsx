import React from 'react';
import { Icon } from "semantic-ui-react";
import {  Diagnosis, Entry } from '../types'
import '../App.css'

const SingleEntry = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {

  const getIcon = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return 'user md';
      case 'OccupationalHealthcare':
        return 'stethoscope';
      case 'Hospital':
        return 'hospital';
      default:
        return 'plus square'
    }
  }

  const icon = getIcon()

  const getColor = () => {
    if(entry.type === 'HealthCheck') {
      switch (entry.healthCheckRating) {
        case 0:
          return 'green';
        case 1:
          return 'yellow';
        case 2:
          return 'orange';
        default:
          return 'blue'
      }
    }
  }

  const color = getColor()

  return (
    <div className={'singleEntry'}>
      <div className={'entryHeader'}>{entry.date} <Icon name={icon} size={'large'}/> {entry.type === 'OccupationalHealthcare' ? entry.employerName : null} </div>
      <div className={'entryDescription'}><i>{entry.description}</i></div>
      {entry.diagnosisCodes ?
        <ul>
          {entry.diagnosisCodes.map((dc, j) => <li key={j}>{dc} {diagnoses.find(d => d.code === dc) ? diagnoses.filter(d => d.code === dc)[0].name : null}</li>)}
        </ul> : null
      }
    {entry.type === 'HealthCheck' ? <Icon name={'heart'} color={color}/> : null}
    </div>
  )

};

export default SingleEntry;