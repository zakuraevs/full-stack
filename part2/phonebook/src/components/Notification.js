import React from 'react'

const Notification = (props) => {

    const notificationStyle = {
        color: props.color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
      

    if (props.message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle} >
        {props.message}
      </div>
    )
  }

export default Notification