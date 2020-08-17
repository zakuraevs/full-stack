import React, {useEffect} from 'react'
import axios from 'axios'
require('dotenv').config()

const ExpandedCountry = (props) => {

    const api_key = process.env.REACT_APP_API_KEY

    const params = {
        'access_key': api_key,
        'query': props.country.capital
    }

    //console.log(api_key)
    //When the button is clicked, removes this country from list of expanded
    //This changes App's state and makes the page re-render
    //When it re-renders and decides whether to map this country as expanded or hidden,
    //It sees that this country is not on the expanded list
    //And displays it as hidden.
    const handleVisibilityChange = () => {
        props.setExpandedCountries( props.expandedCountries.filter(c => c.name !== props.country.name) )
    }

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current`, {params})
          .then(response => {
            console.log('ENV: ', process.env.REACT_APP_API_KEY )
            console.log('key: ', api_key)
            console.log('promise fulfilled')
            console.log('response: ', response)
            props.setWeather(response.data.current)
          })
      }, [])

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
            <h2>Weather in {props.country.capital}</h2>
            <div><strong>temperature: </strong>{props.weather.temperature} Celsius</div>
            <div><strong>wind: </strong>{props.weather.wind_speed} {props.weather.wind_dir}</div>
            <img src={ props.weather.weather_icons } alt={"weather in " + props.country.capital} width="100" />
        </div>
    )
}
  
export default ExpandedCountry
//
//
//
//