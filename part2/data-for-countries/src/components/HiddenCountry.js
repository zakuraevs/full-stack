import React from 'react'

const HiddenCountry = (props) => {


    const handleVisibilityChange = () => {

            props.setExpandedCountries( props.expandedCountries.concat( props.countries.filter(c => c.name === props.name) ))

            console.log(!props.expandedCountries.includes(c => c.name === props.name))
    }

        return(<div>{props.name} <button onClick={handleVisibilityChange}>Show</button></div>)
  }


  
  export default HiddenCountry