import React, { ChangeEventHandler, useState, useEffect, KeyboardEventHandler } from 'react';
import axios from 'axios';
import databaseUrl from '../../config/config';
import { ISearch, IFlight } from '../../models/models';
import './FlightSearch.css';
import AutoComplete from '../AutoComplete/AutoComplete';

type FlightSearchProps = {
  setFoundFlights: React.Dispatch<React.SetStateAction<IFlight[]>>;
}

const FlightSearch = ({ setFoundFlights }: FlightSearchProps) => {

  const [searchFields, setSearchFields] = useState<ISearch>({
    arrAirport: {
      id: 0,
      name: "",
      code: "",
      state: "",
      city: ""
    },
    depAirport: {
      id: 0,
      name: "",
      code: "",
      state: "",
      city: ""
    },
    airline: {
      id: 0,
      name: "",
      icao_code: ""
    },
    time: ""
  })


  const handleTimeChange: ChangeEventHandler<HTMLInputElement> =(event) => {
    const newState = {...searchFields, time: event.target.value};
    setSearchFields(newState);
  }

  const fetchFlightData = () => {
    axios.get(`https://airlabs.co/api/v9/schedules?api_key=${process.env.REACT_APP_API}&airline_icao=${searchFields.airline.icao_code}&arr_icao=${searchFields.arrAirport.code}&dep_icao=${searchFields.depAirport.code}`)
      .then(res => {
        console.log(res.data.response);
        console.log(res.data.response[0].arr_time.split(" ")[1]);
        const filteredFlight: IFlight[] = res.data.response.filter((flight: IFlight) => {
          const time = flight.arr_time.split(" ")[1].split(":");
          const totalMins = (+time[0] * 60) + (+time[1]);
          
          const searchTime = searchFields.time.split(":");
          const searchMins = (+searchTime[0] * 60) + (+searchTime[1]);
          console.log("TotalMins: ", totalMins);
          console.log("SearchMins: ", searchMins);
          return totalMins > searchMins - 30 && totalMins < searchMins + 30;
        })
        // filtered flight is an array of one or maybe more flights found
        setFoundFlights(filteredFlight);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
      <h2>Departure Airport</h2>
      <AutoComplete category={"airport"} stateSetter={setSearchFields} currentState={searchFields} field="depAirport"/>
      <h2>Arrival Airport</h2>
      <AutoComplete category={"airport"} stateSetter={setSearchFields} currentState={searchFields} field="arrAirport"/>
      {/* To add a search by city/state feature */}
      <div>
        <p>Not Sure The Name?</p>
        <button>Click Here!</button>
      </div>
      <h2>Airline</h2>
      <AutoComplete category={"airline"} stateSetter={setSearchFields} currentState={searchFields} field="airline"/>
      <h2>Approximate Arrival Time</h2>
      <input type="time" value={searchFields.time} onChange={handleTimeChange}/>
      <button onClick={fetchFlightData}>Search Flights</button>
    </div>
  )
}

export default FlightSearch