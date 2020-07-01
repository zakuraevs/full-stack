import React, { useState } from 'react'
import Contact from './components/Contact'

const App = (props) => {
  const [ contacts, setContacts ] = useState(props.contacts) 
  const [ newName, setNewName ] = useState('')
  const addContact = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      id: newName
    }
    setContacts(contacts.concat(noteObject))
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {contacts.map((contact, i) => <Contact key={contact.name} contact={contact} />)}
    </div>
  )
}

export default App
