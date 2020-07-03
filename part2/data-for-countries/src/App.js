import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

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

const CountriesDisplayed = (props) => {
  const fits = props.countries
  .filter(country => country.name.toLowerCase()
  .includes(props.searchValue.toLowerCase()))

  const numOfFits = fits.length

  if (props.searchValue === '') {
    return (
      <div>
        Type country name above
      </div>
    )
  } else if (numOfFits > 10) {
    return (
      <div>
        Too many matches, specify name in more detail
      </div>
    )
  } else if (numOfFits <= 10 && numOfFits > 1) {
    return (
      <div>
        {props.countries
          .filter(country => country.name.toLowerCase().includes(props.searchValue))
          .map((country,i) => <div key={i}> {country.name} </div>)}
      </div>
    )
  } else if (numOfFits === 1) {
    const oneCountry = fits[0]
    return (
      <div>
        {
          < Country name={oneCountry.name} capital={oneCountry.capital} 
          population={oneCountry.population} languages={oneCountry.languages} 
          flag={oneCountry.flag} />
        }
      </div>
    )
  } else {
    return (
      <div>Type the appropriate country name or a part of it</div>
    )
  }

}

const App = () => {

  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleNewSearchValue = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <SearchField searchValue={searchValue} handleNewSearchValue={handleNewSearchValue} />
      <CountriesDisplayed searchValue={searchValue} countries={countries} />
    </div>
  )
}

export default App
