import React, { useState } from 'react'
import Contact from './components/Contact'

const App = (props) => {
  const [ contacts, setContacts ] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 'Dan Abramov' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 'Mary Poppendieck' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNum, setNewPhoneNum ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if(contacts.map(contact => contact.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      const noteObject = {
        name: newName,
        phone: newPhoneNum,
        id: newName
      }
      setContacts(contacts.concat(noteObject))
      setNewName('')
      setNewPhoneNum('')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewPhoneNum = (event) => {
    console.log(event.target.value)
    setNewPhoneNum(event.target.value)
  }

  const handleNewFilterValue = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <div>
      {/*<div>debug: {newName}</div>*/}
      <h2>Phonebook</h2>
      <div>
        filter contacts: <input
          value={filterValue}
          onChange={handleNewFilterValue}
        />
      </div>
      <form onSubmit={addContact}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
            value={newPhoneNum}
            onChange={handleNewPhoneNum}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {contacts.filter(contact => contact.name.toLowerCase()
          .includes(filterValue))
          .map((contact, i) => <Contact key={contact.name} contact={contact} />)}
    </div>
  )
}

export default App
