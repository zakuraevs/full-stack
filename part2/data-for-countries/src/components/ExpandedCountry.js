import React from 'react'

const ExpandedCountry = (props) => {

    //When the button is clicked, removes this country from list of expanded
    //This changes App's state and makes the page re-render
    //When it re-renders and decides whether to map this country as expanded or hidden,
    //It sees that this country is not on the expanded list
    //And displays it as hidden.
    const handleVisibilityChange = () => {
        props.setExpandedCountries( props.expandedCountries.filter(c => c.name !== props.country.name) )
    }

    return (
        <div>
            <h1>{props.country.name}   { props.single ? null : <button onClick={handleVisibilityChange}>hide</button>}</h1>
            <div>capital: {props.country.capital}</div>
            <div>population: {props.country.population}</div>
            <h2>languages</h2>
            <ul>
                {props.country.languages.map((language, i) => <li key={i}> {language.name} </li>)}
            </ul>
            <img src={props.country.flag} alt={"flag of " + props.country.name} width="150" />
        </div>
    )
}
  
export default ExpandedCountry