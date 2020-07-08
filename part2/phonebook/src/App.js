import React, { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Notification from './components/Notification' 
import contactService from './services/contacts'

//Component for filter field
const FilterField = (props) => {
  return (
    <div>
        filter contacts: <input
          value={props.filterValue}
          onChange={props.handleNewFilterValue}
        />
    </div>
)}

//Component for form to add new contacts
const ContactForm = (props) => {
  return(
    <form onSubmit={props.addContact}>
    <div>
      name: <input 
        value={props.newName}
        onChange={props.handleNewName}
      />
    </div>
    <div>
      number: <input 
        value={props.newPhoneNum}
        onChange={props.handleNewPhoneNum}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
    </form>
)}

//Component that renders existing contacts that meet filtering criteria
const RenderingOfContacts = (props) => {
const filteredContacts = props.contacts
                          .filter(contact => contact.name.toLowerCase()
                          .includes(props.filterValue.toLowerCase()))
  return(
    <div>
      {
        filteredContacts.map(contact => <Contact 
                              key={contact.name} 
                              contact={contact} 
                              setContacts={props.setContacts} 
                              contacts={props.contacts}/>
                              )}
    </div>
)}

const App = () => {
  //stat that stores contact objects
  //hard-coded test contacts
  const [ contacts, setContacts ] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 'Dan Abramov' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 'Mary Poppendieck' }
  ])
  //state that stores the value of new name being added, i.e. what is currently typed in the name field
  const [ newName, setNewName ] = useState('')
  //state that stores the value of new name phone number added, i.e. what is currently typed in the number field
  const [ newPhoneNum, setNewPhoneNum ] = useState('')
  //state that stores the current value of the filter field
  const [ filterValue, setFilterValue ] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  const [notificationColor, setNotificationColor] = useState('green')

  //Effect hook that calls the function defined within curly braces whenever the page is re-rendered
  useEffect(() => {
    contactService
      .getAll()
      .then(data => {
        //console.log(response.config)
        setContacts(data)
      })
  }, [])

  //function that is called when the 'add' button is clicked. Adds new object to array of contacts, resets several states
  const addContact = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      number: newPhoneNum,
    }

    if(contacts.map(contact => contact.name).includes(newName)) {
      const result = window.confirm(`${newName} is already added to the phonebook. Update the old number with a new one?`)
      if(result) {
        contactService
          .updatePhone(contacts.find(contact => contact.name === newName).id, noteObject)
          .then(date => {
            contactService.getAll().then(data => {setContacts(data)})
            setNewName('')
            setNewPhoneNum('')
            setNotificationMessage(`Updated ${newName}'s phone`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationColor('red')
            setNotificationMessage(
              `Information of ${newName} was already removed from server`
            )
            setTimeout(() => {
              setNotificationColor('green')
              setNotificationMessage(null)
            }, 5000)
            setContacts(contacts.filter(c => c.id !== contacts.find(contact => contact.name === newName).id,))
          })
        }
    } else {

      contactService
        .create(noteObject)
        .then(data => {
          setContacts(contacts.concat(data))
          setNewName('')
          setNewPhoneNum('')
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  //Event handlers for the 3 forms used in the app
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewPhoneNum = (event) => {
    console.log(event.target.value)
    setNewPhoneNum(event.target.value)
  }

  const handleNewFilterValue = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} color={notificationColor}/>
      
      < FilterField filterValue={filterValue} handleNewFilterValue={handleNewFilterValue}  />
      
      < ContactForm addContact={addContact} newName={newName} handleNewName={handleNewName} newPhoneNum={newPhoneNum} handleNewPhoneNum={handleNewPhoneNum}/>

      <h2>Numbers</h2>
        
      < RenderingOfContacts setContacts={setContacts} contacts={contacts} filterValue={filterValue} />

    </div>
  )
}

export default App
