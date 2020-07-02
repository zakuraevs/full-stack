import React, { useState } from 'react'
import Contact from './components/Contact'

const App = (props) => {
  const [ contacts, setContacts ] = useState(props.contacts) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNum, setNewPhoneNum] = useState('')

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


  return (
    <div>
      {/*<div>debug: {newName}</div>*/}
      <h2>Phonebook</h2>
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
        {contacts.map((contact, i) => <Contact key={contact.name} contact={contact} />)}
    </div>
  )
}

export default App
