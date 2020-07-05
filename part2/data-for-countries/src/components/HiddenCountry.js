import React from 'react'

const HiddenCountry = (props) => {


    const handleVisibilityChange = () => {
            props.changeVisibility(props.name)
    }

        return(<div>{props.name} <button onClick={handleVisibilityChange}>Show</button></div>)
  }


  
  export default HiddenCountry