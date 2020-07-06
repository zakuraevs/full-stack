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

  //Countries that fir the search parameter
  const fits = props.countries
    .filter(country => country.name.toLowerCase()
    .includes(props.searchValue.toLowerCase()))

  //The number of fits
  const numOfFits = fits.length
  //for debugging:
  console.log(numOfFits)
  
  //Function that changes the visibility of a country when the button is clicked
  //NEEDS WORK HERE 
  const changeVisibility = (name) => {
    //const cntisWithNewVis = 
    props.setCountries(props.countries.map( country => country.name !== name ? country : {...country, visible: !country.visible} ))
  }

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

    return (
      <div>
        {fits
          .map((country,i) => 
            <div key={i}>
             {props.expandedCountries.includes(country) ? < ExpandedCountry 
              name={country.name} 
              capital={country.capital}
              display={props.countries.find(c => c.name === country.name).visible} 
              population={country.population} 
              languages={country.languages} 
              flag={country.flag} 
              changeVisibility={changeVisibility}
              expandedCountries={props.expandedCountries} 
              setExpandedCountries={props.setExpandedCountries}
              /> : < HiddenCountry countries={props.countries} name={country.name} changeVisibility={changeVisibility} expandedCountries={props.expandedCountries} setExpandedCountries={props.setExpandedCountries}/>}
          
            </div>
            )}
      </div>
    )} else if (numOfFits === 1) {
    
    const oneCountry = fits[0]
    return (
      <div>
        {
          < ExpandedCountry single={true} name={oneCountry.name} capital={oneCountry.capital} display={true}
          population={oneCountry.population} languages={oneCountry.languages} 
          flag={oneCountry.flag} changeVisibility={changeVisibility}
          expandedCountries={props.expandedCountries} 
              setExpandedCountries={props.setExpandedCountries}/>
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
  const [ expandedCountries, setExpandedCountries ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.map(country => Object.assign({}, country, {visible: false})))
      })
  }, [])

  const handleNewSearchValue = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <SearchField searchValue={searchValue} handleNewSearchValue={handleNewSearchValue} />
      <CountriesDisplayed searchValue={searchValue} countries={countries} setCountries={setCountries} expandedCountries={expandedCountries} setExpandedCountries={setExpandedCountries} />
    </div>
  )
}

export default App
