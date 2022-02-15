import React, { ChangeEventHandler, useState, useEffect, KeyboardEventHandler } from 'react';
import axios from 'axios';
import databaseUrl from '../../config/config';
import IAirports from '../../models/models';
import './AirportSearch.css';
import AutoComplete from '../AutoComplete/AutoComplete';


const AirportSearch = () => {

  const [chosenAirport, setChosenAirport] = useState<IAirports | {}>({});
  const [chosenAirline, setChosenAirline] = useState({});


  return (
    <div>
      <h2>Airport Name</h2>
      <AutoComplete category={"airports"} stateSetter={setChosenAirport}/>
      {/* To add a search by city/state feature */}
      <div>
        <p>Not Sure The Name?</p>
        <button>Click Here!</button>
      </div>
      <h2>Airline</h2>
      <AutoComplete category={"airlines"} stateSetter={setChosenAirport}/>
    </div>
  )
}

export default AirportSearch