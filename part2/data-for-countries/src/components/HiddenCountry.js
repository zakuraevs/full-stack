import React from 'react'

const HiddenCountry = (props) => {

    //Adds this country to the expanded countries list, updating state and re-rendering
    const handleVisibilityChange = () => {
        props.setExpandedCountries( props.expandedCountries.concat(props.countries.filter(c => c.name === props.name)) )
    }
        return(<div>{props.name} <button onClick={handleVisibilityChange}>Show</button></div>)
  }

export default HiddenCountry