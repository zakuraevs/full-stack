import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ExpandedCountry from './components/ExpandedCountry'
import HiddenCountry from './components/HiddenCountry'

//Search field component
//Takes current search value and function to handle that value as props
const SearchField = (props) => {
  return (
    <div>
      Find countries: <input
        value={props.searchValue}
        onChange={props.handleNewSearchValue}
      />
    </div>
  )
}

//Component that displays the found country or countries
const CountriesDisplayed = (props) => {

  //Countries that fit the search parameter
  const fits = props.countries
    .filter(country => country.name.toLowerCase()
    .includes(props.searchValue.toLowerCase()))

  //The number of fits
  const numOfFits = fits.length

  //What gets displayed based on number of fits
  //If search field is empty:
  if (props.searchValue === '') {
    return (
      <div>
        Type country name above
      </div>
    )

  //If there are more than 10 fits
  } else if (numOfFits > 10) {
    return (
      <div>
        Too many matches, specify name in more detail
      </div>
    )

  //If there are between 1 and 10 fits, but not 1  
  } else if (numOfFits <= 10 && numOfFits > 1) {

    //There are between 1 and 10 countries that fir the search criteria
    //This maps all of them. If a country is included in expanded countrues list,
    //It is mapped to an ExpandedCountry component,
    //Otherwise to a HiddenCountry component
    return (
      <div>
        {fits.map((country,i) => 
            <div key={i}>{
              props.expandedCountries.includes(country) ? 
                < ExpandedCountry 
                  country={country}
                  expandedCountries={props.expandedCountries} 
                  setExpandedCountries={props.setExpandedCountries}
                  weather={props.weather}
                  setWeather={props.setWeather}
                /> : 
                < HiddenCountry 
                  countries={props.countries} 
                  name={country.name} 
                  expandedCountries={props.expandedCountries} 
                  setExpandedCountries={props.setExpandedCountries}
                />
            }</div>
        )}
      </div>

  //If there is exactly one fit          
  )} else if (numOfFits === 1) {
    
    const oneCountry = fits[0]
    return (
      <div>
        < ExpandedCountry 
          single={true}
          country={oneCountry} 
          expandedCountries={props.expandedCountries} 
          setExpandedCountries={props.setExpandedCountries}
          weather={props.weather}
          setWeather={props.setWeather}
        />
      </div>
    )

  //If there are no fits
  } else {
    return (
      <div>Type the appropriate country name or a part of it</div>
    )
  }
}

const App = () => {

  //States responsible for current search value, 
  //all countries and countries that are shown in expanded form
  const [ searchValue, setSearchValue ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ expandedCountries, setExpandedCountries ] = useState([])
  const [ weather ,setWeather ] = useState([])

  //Getting countries info from the server
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  //Handler for search field
  const handleNewSearchValue = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <SearchField 
        searchValue={searchValue} 
        handleNewSearchValue={handleNewSearchValue} 
      />
      <CountriesDisplayed 
        searchValue={searchValue} 
        countries={countries} 
        setCountries={setCountries} 
        expandedCountries={expandedCountries} 
        setExpandedCountries={setExpandedCountries}
        weather={weather}
        setWeather={setWeather} 
      />
    </div>
  )
}

export default App
