import { ChangeEventHandler, useState } from 'react';
import axios from 'axios';
import databaseUrl from '../config';
import IAirports from '../../models/models';
import './AirportSearch.css';


const AirportSearch = () => {

  const [searchString, setSearchString] = useState("");
  const [autoCompleteResults, setAutoCompleteResults] = useState<IAirports[] | []>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.target.value.length === 0 ? setShowSuggestions(false) : setShowSuggestions(true);
    setSearchString(event.target.value);
    axios.get(`${databaseUrl}/airports?search=${searchString}`)
      .then(res => {
        setAutoCompleteResults(res.data)
        console.log(autoCompleteResults)
      })
  }

  return (
    <div>
      <div className="search-container">
        <input type="search" value={searchString} onChange={handleChange} className="search-input"/>
        <ul className="search-suggestions-ul">
          {showSuggestions && autoCompleteResults.map(result => {
            return (
              <li key={result.name} className="search-suggestions-li">
                {result.name}
              </li>
            );
          })}
        </ul>
      </div>
      {/* To add a search by city/state feature */}
      <div>
        <p>Not Sure The Name?</p>
        <button>Click Here!</button>
      </div>
      
    </div>
  )
}

export default AirportSearch