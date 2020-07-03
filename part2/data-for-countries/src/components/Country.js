import React from 'react'

const Country = (props) => {

    return (
      <div>
        <h1>{props.name}</h1>
        <div>capital: {props.capital}</div>
        <div>population: {props.population}</div>
        <h2>languages</h2>
        <ul>
            {props.languages.map((language,i) => <li key={i}> {language.name} </li>)}
        </ul>
        <img src={props.flag} alt={"flag of " + props.name}  width="150" />
      </div>
    )
  }
  
  export default Country