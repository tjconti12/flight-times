import { useState } from 'react';
import { IFlight } from './models/models';
import './App.css';
import FlightSearch from './components/FlightSearch/FlightSearch';
import FlightDisplay from './components/FlightDisplay/FlightDisplay';

function App() {
  const [foundFlights, setFoundFlights] = useState<IFlight[] | []>([]);
  const [searched, setSearched] = useState(false);

  return (
    <div>
      <h1>Flight Times</h1>
      <FlightSearch setFoundFlights={setFoundFlights} setSearched={setSearched}/>
      <FlightDisplay foundFlights={foundFlights} searched={searched}/>
    </div>
  );
}

export default App;
