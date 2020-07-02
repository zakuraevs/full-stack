import React from 'react'

const Contact = ({ contact }) => {
  return (
    <div>{contact.name} {contact.phone}</div>
  )
}

export default Contact