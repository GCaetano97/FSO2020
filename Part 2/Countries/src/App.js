import React, {useState,useEffect} from 'react'
import axios from 'axios'

function showData (countries,filter, setFilter) {

  const filtered=countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(filtered.length>10){
    return(
      <div>There's to much data, please specify</div>
    )
  }else if(filtered.length===1){

    return(
      <div>
        <h1>{filtered[0].name}</h1>

        <p>capital {filtered[0].capital}</p>
        <p>population {filtered[0].population}</p>

        <h2>Languages spoken</h2>
        {filtered[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        <p></p>
        <img 
        src={filtered[0].flag}
        transformation="true" width="160" height="100"
        />
      </div>
    )
  }else{
    return(

      <div>
        {filtered.map(country => <li key={country.alpha3Code}>{country.name}<button onClick={()=>{handleShowClick(country, setFilter)}}>Show</button> </li>)}
      </div>
    )
  }
}

const handleShowClick = (country, setFilter) => {
  console.log(country)
  setFilter(country.name)
}


function App() {

  const [filter, setFilter] = useState('')
  const [countries,setCountries] = useState([])

  const handleFilterChange = (event) => {
  setFilter(event.target.value)

 
  
}

  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
  },[])


  

  return (
    <div>
    <div>find countries <input value={filter} onChange={handleFilterChange} /></div>
    {showData(countries,filter, setFilter)}
    

    </div>
  );
}


export default App;
