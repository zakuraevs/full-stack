import React from 'react'

const ExpandedCountry = (props) => {
console.log(props.single)
    const handleVisibilityChange = () => {
        props.setExpandedCountries( props.expandedCountries.filter(c => c.name !== props.name) )
        props.changeVisibility(props.name)
    }

    return (
        <div>
            <h1>{props.name}   { props.single ? null : <button onClick={handleVisibilityChange}>hide</button>}</h1>
            <div>capital: {props.capital}</div>
            <div>population: {props.population}</div>
            <h2>languages</h2>
            <ul>
                {props.languages.map((language, i) => <li key={i}> {language.name} </li>)}
            </ul>
            <img src={props.flag} alt={"flag of " + props.name} width="150" />
        </div>
    )

}
  
  export default ExpandedCountry