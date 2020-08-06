import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';

//import { FIND_PERSON } from '../queries'


const Authors = ({ authors }) => {

  //const [getPerson, result] = useLazyQuery(FIND_PERSON) 
  //const [person, setPerson] = useState(null)

  //const showPerson = (name) => {
  //  getPerson({ variables: { nameToSearch: name } })
  //}

  //useEffect(() => {
  //  if (result.data) {
  //    setPerson(result.data.findPerson)
  //  }
  //}, [result])

  /*if (person) {
    return(
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }*/
  
  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(a => 
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors