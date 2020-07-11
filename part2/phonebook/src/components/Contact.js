import React from 'react'
import contactService from '../services/contacts'

const Contact = (props) => {

  const removeContact = () => {
    const result = window.confirm(`Delete ${props.contact.name} ?`)
    if(result) {
      contactService.deleteContact(props.contact.id)
        .then(data => {
          contactService.getAll().then(data => {props.setContacts(data)})
      })
    }
  }

  return (
    <div>{props.contact.name} {props.contact.phone} <button onClick={removeContact}>delete</button></div>
  )
}

export default Contact
