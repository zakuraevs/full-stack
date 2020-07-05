import React from 'react'

const ExpandedCountry = (props) => {

    console.log(props.display)

    const handleVisibilityChange = () => {
        if (!props.visible){
            props.changeVisibility(props.name)
        }
    }

    const titleOfButton = props.visible ? 'hide' : 'show'

    if (props.display) {
        return (
            <div>
                <h1>{props.name}</h1>
                <button onClick={handleVisibilityChange}>show</button>
                <div>capital: {props.capital}</div>
                <div>population: {props.population}</div>
                <h2>languages</h2>
                <ul>
                    {props.languages.map((language,i) => <li key={i}> {language.name} </li>)}
                </ul>
                <img src={props.flag} alt={"flag of " + props.name}  width="150" />
            </div>
        )} else {
            return(<div>{props.name} <button onClick={handleVisibilityChange}>{titleOfButton}</button></div>)
        }
  }


  
  export default ExpandedCountry